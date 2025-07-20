import { Component, effect, input, signal } from '@angular/core';
import { UrlSanitizerPipe } from "../../customPipes/url-sanitizer.pipe";
import { TitleCasePipe } from '@angular/common';
import { LucideAngularModule, ThermometerSnowflake, ThermometerSun } from "lucide-angular";
import { Main, Weather } from '../../models/current-weather.model';

@Component({
  selector: 'app-forecast-tab-entry',
  imports: [UrlSanitizerPipe, TitleCasePipe, LucideAngularModule],
  templateUrl: './forecast-tab-entry.component.html',
  styleUrl: './forecast-tab-entry.component.css'
})
export class ForecastTabEntryComponent {

  forecastDayInputSignal = input<{dt_txt: string; weather: Weather[]; main: Main}>()

  forecastDay?: {dt_txt: string; weather: Weather[]; main: Main}

  forecastDayReadySignal = signal(false)

  readonly thermometerSnowFlake = ThermometerSnowflake
  readonly thermometerSun = ThermometerSun

  constructor() {
    effect(() => {
      this.forecastDayReadySignal.set(false)
      this.forecastDay = this.forecastDayInputSignal()
      if(this.forecastDay) {
        this.forecastDayReadySignal.set(true)
      }
    })
  }

}
