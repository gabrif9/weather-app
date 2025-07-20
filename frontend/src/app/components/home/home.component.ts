import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchLocationComponent } from "../search-location/search-location.component";
import { CurrentWeatherComponent } from "../current-weather/current-weather.component";
import { WeatherChartsComponent } from "../weather-charts/weather-charts.component";
import { FiveDaysForecastComponent } from "../five-days-forecast/five-days-forecast.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SearchLocationComponent, CurrentWeatherComponent, WeatherChartsComponent, FiveDaysForecastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
