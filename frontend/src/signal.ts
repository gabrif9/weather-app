import { signal, Signal } from "@angular/core";
import { CityDetails } from "./app/models/city.mode";

export const globalCitySignal = signal<CityDetails | null>(null)