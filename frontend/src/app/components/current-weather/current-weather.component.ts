import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CurrentWeather } from '../../models/current-weather.model';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal } from '../../../signal';
import { WeatherService } from '../../services/weather.service';
import { combineLatest, finalize, map, timer } from 'rxjs';
import { FormatDatePipe } from "../../customPipes/formt-date.pipe";
import { LucideAngularModule, FileIcon, Droplet, Thermometer, Wind } from 'lucide-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { UrlSanitizerPipe } from "../../customPipes/url-sanitizer.pipe";
import { ToastDetails, ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-current-weather',
  imports: [FormatDatePipe, LucideAngularModule, TitleCasePipe, UrlSanitizerPipe, ToastComponent],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent{

  currentWeatherService = inject(WeatherService)

  currentWeatherDataReadySignal = signal(false)
  retrievingWeatherDataSignal = signal(false)

  currentWeatherData?: CurrentWeather

  cityDetails?: CityDetails | null

  readonly dropLet = Droplet
  readonly thermometer = Thermometer
  readonly wind = Wind

  sanitizer = inject(DomSanitizer)

  toastDetails?: ToastDetails
  

  constructor() {
    effect(() => {
      this.cityDetails = globalCitySignal()
      if(!!this.cityDetails) {
        this.getCityWeather(this.cityDetails)
      }
    })
  }

  getCityWeather(city: CityDetails) {

    this.retrievingWeatherDataSignal.set(true)
    combineLatest([timer(1500), this.currentWeatherService.getCurrentWeather(city.location[0], city.location[1])])
    .pipe(
      finalize(() => this.retrievingWeatherDataSignal.set(false)),
      map(x => x[1])
    ).subscribe({
      next: result => {
        if(result) {
          this.currentWeatherData = result
          this.currentWeatherDataReadySignal.set(true)
        } else {
          this.toastDetails = {
            message: "Weather information not found for, " + city.name,
            class: 'alert-error'
          }
        }
      },
      error: err => {
        console.log(err)
        this.toastDetails = {
            message: "Error while retrieving weather information",
            class: 'alert-error'
          }
      }
    })
    
  }

}
