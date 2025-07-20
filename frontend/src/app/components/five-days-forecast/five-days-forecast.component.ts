import { Component, effect, signal } from '@angular/core';
import { FiveDaysWeather } from '../../models/five-days-weather.mode';
import { globalFiveDaysSignal } from '../../../signal';
import { Main, Weather } from '../../models/current-weather.model';
import { ThermometerSnowflake, LucideAngularModule, ThermometerSun } from 'lucide-angular';
import { ForecastTabEntryComponent } from "../forecast-tab-entry/forecast-tab-entry.component";

@Component({
  selector: 'app-five-days-forecast',
  imports: [LucideAngularModule, ForecastTabEntryComponent],
  templateUrl: './five-days-forecast.component.html',
  styleUrl: './five-days-forecast.component.css'
})
export class FiveDaysForecastComponent {

  fiveDaysWeatherDataReadySignal = signal(false)

  fiveDaysWeatherData?: FiveDaysWeather

  forecastMapByDay?: Map<string, {dt_txt: string; weather: Weather[]; main: Main}[]>

  tabLabels: string[] = []

  readonly thermometerSnowFlake = ThermometerSnowflake
  readonly thermometerSun = ThermometerSun

  constructor() {
    effect(() => {
      const value = globalFiveDaysSignal();
      if (value != null) {
        this.fiveDaysWeatherData = value;
        this.manageForecastData()
      }
    })
  }

  manageForecastData() {
    this.forecastMapByDay = new Map<string, {dt_txt: string; weather: Weather[]; main: Main}[]>();

    this.fiveDaysWeatherData?.list.forEach(item => {
      const day = item.dt_txt.split(' ')[0].split('-')[2] + '-' + item.dt_txt.split(' ')[0].split('-')[1] 

      if(!this.forecastMapByDay!.has(day)){
        this.forecastMapByDay!.set(day, [])
      }

      this.forecastMapByDay!.get(day)!.push({
        dt_txt: item.dt_txt.split(' ')[1],
        weather: item.weather,
        main: item.main
      })
    })


    this.forecastMapByDay.forEach((value, key) => {
      this.tabLabels.push(key)
    })

    this.tabLabels.splice(0, 1)
    console.log(this.tabLabels)
  }

  tabChanged(event: any) {
    let tabName = event.target.ariaLabel
    document.getElementsByName(tabName)
  }

}
