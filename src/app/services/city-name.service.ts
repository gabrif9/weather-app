import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/five-days-weather.mode';
import { CITY_ENDPOINT } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CityNameService {

  http = inject(HttpClient)

  getCityByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(CITY_ENDPOINT, {params: {city: name}})
  }
}
