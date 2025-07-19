import { Main, Weather, Clouds, Wind, Sys, Coord } from "./current-weather.model"

export interface FiveDaysWeather {
  cod: string
  message: number
  cnt: number
  list: List[]
  city: City
}

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
  rain?: Rain
}

export interface Rain {
  "3h": number
}


export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}