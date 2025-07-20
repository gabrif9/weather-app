import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime, filter, Subscription, tap } from 'rxjs';
import { CityNameService } from '../../services/city-name.service';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal } from '../../../signal';

@Component({
  selector: 'app-search-location',
  imports: [ReactiveFormsModule],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent implements OnInit, OnDestroy{

  locationSearched = signal('')

  searchCityFormControl = new FormControl('')

  searchCitySubscription?: Subscription

  cityService = inject(CityNameService)

  cityDataReadySignal = signal(false)
  searchingCitySignal = signal(false)

  citiesName: CityDetails[] = []

  ngOnInit(): void {
      this.searchCitySubscription = this.searchCityFormControl.valueChanges
      .pipe(
        tap(value => {
          this.searchingCitySignal.set(true)
          this.cityDataReadySignal.set(false)
        }),
        debounceTime(1500)
      )
      .subscribe((value) => {
        if(!!value && value.length > 1) {
          this.getCity(value!)
        } else {
          this.locationSearched.set('')
        }
      })
  }

  ngOnDestroy(): void {
      this.searchCitySubscription?.unsubscribe()
  }

  getCity(cityname: string) {
    this.cityService.getCityByName(cityname).subscribe({
      next: (cities: CityDetails[]) => {
        if(!!cities && cities.length > 0) {
          this.citiesName = cities
          this.searchingCitySignal.set(false)
          this.cityDataReadySignal.set(true)
        }else {
          // TODO: trigger a notification "no city found"
        }
      },
      error: (err) => {
        console.log(err);
        // TODO: trigger a notification "error on server"
      }
    })
  }

  selectCity(city: CityDetails) {
    this.cityDataReadySignal.set(false)
    this.locationSearched.set(city.name)
    globalCitySignal.set(city)
  }
}
