import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CITY_ENDPOINT } from '../../environment/environment';
import { CityDetails } from '../models/city.mode';

@Injectable({
  providedIn: 'root'
})
export class CityNameService {

  http = inject(HttpClient)

  getCityByName(name: string): Observable<CityDetails[]> {
    return this.http.get<CityDetails[]>(CITY_ENDPOINT, {params: {city: name}})
  }
}
