import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime, filter, Subscription, tap } from 'rxjs';
import { CityNameService } from '../../services/city-name.service';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal } from '../../../signal';
import { ToastComponent, ToastDetails } from "../toast/toast.component";

@Component({
  selector: 'app-search-location',
  imports: [ReactiveFormsModule, ToastComponent],
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

  toastDetails?: ToastDetails

  ngOnInit(): void {
      this.searchCitySubscription = this.searchCityFormControl.valueChanges
      .pipe(
        tap(value => {
          this.cityDataReadySignal.set(false)
          if(value!.length > 0){
            this.searchingCitySignal.set(true)
          }
          
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
        this.searchingCitySignal.set(false)
        if(!!cities && cities.length > 0) {
          this.citiesName = cities
          this.cityDataReadySignal.set(true)
        }else {
          // TODO: trigger a notification "no city found"
          this.toastDetails = {
            message: "No city found with this name",
            class: 'alert-error'
          }
        }
      },
      error: (err) => {
        console.log(err);
        this.toastDetails = {
            message: "Error while retrieving cities from server",
            class: 'alert-error'
          }
      }
    })
  }

  selectCity(city: CityDetails) {
    this.cityDataReadySignal.set(false)
    this.locationSearched.set(city.name)
    globalCitySignal.set(city)
  }
}
