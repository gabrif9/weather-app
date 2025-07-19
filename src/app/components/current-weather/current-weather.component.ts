import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CurrentWeather } from '../../models/current-weather.model';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal } from '../../../signal';
import { WeatherService } from '../../services/weather.service';
import { combineLatest, finalize, map, timer } from 'rxjs';
import { FormatDatePipe } from "../../customPipes/formt-date.pipe";
import { LucideAngularModule, FileIcon, Droplet, Thermometer, Wind } from 'lucide-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-current-weather',
  imports: [FormatDatePipe, LucideAngularModule],
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

  
  iconWeatherUrl?: SafeUrl

  sanitizer = inject(DomSanitizer)
  

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
          console.log(result)
          this.currentWeatherData = result
          this.iconWeatherUrl = this.sanitizer.bypassSecurityTrustUrl('https://openweathermap.org/img/wn/'+this.currentWeatherData.weather[0].icon + '@2x.png')
          this.currentWeatherDataReadySignal.set(true)
        } else {
          // TODO gestire tramite un toast il fatto che non ci siano dati sul meteo
        }
      }
    })
    
  }

}
