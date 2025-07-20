import { signal, Signal } from "@angular/core";
import { CityDetails } from "./app/models/city.mode";
import { FiveDaysWeather } from "./app/models/five-days-weather.mode";

export const globalCitySignal = signal<CityDetails | null>(null)

export const globalFiveDaysSignal = signal<FiveDaysWeather | null>(null)