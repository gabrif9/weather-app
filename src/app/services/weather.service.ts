import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../models/current-weather.model';
import { CURRENT_WEATHER_URL, FIVE_DAYS_WEATHER_URL } from '../../environment/environment';
import { FiveDaysWeather } from '../models/five-days-weather.mode';
import { APPID } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  http = inject(HttpClient)

  constructor() { }

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(CURRENT_WEATHER_URL, {params: {lat: lat, lon: lon, appid: APPID, units: 'metric'}})
  }

  getFiveDaysForecast(lat: number, lon: number): Observable<FiveDaysWeather> {
    return this.http.get<FiveDaysWeather>(FIVE_DAYS_WEATHER_URL, {params: {lat: lat, lon: lon, appid: APPID, units: 'metric'}})
  }
}
