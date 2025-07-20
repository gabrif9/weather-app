import { Component, effect, inject, signal } from '@angular/core';
import { FiveDaysWeather, List } from '../../models/five-days-weather.mode';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal, globalFiveDaysSignal } from '../../../signal';
import { WeatherService } from '../../services/weather.service';
import { combineLatest, finalize, map, timer } from 'rxjs';
import { formatDate } from '@angular/common';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-weather-charts',
  imports: [],
  templateUrl: './weather-charts.component.html',
  styleUrl: './weather-charts.component.css'
})
export class WeatherChartsComponent {
  chart: Chart | null = null;

  fiveDaysWeatherDataReadySignal = signal(false)
  fiveDaysWeatherRetrievingDataSignal = signal(false)

  weatherService = inject(WeatherService)

  fiveDaysWeatherData?: FiveDaysWeather

  cityDetails?: CityDetails | null

  

  constructor() {
    effect(() => {
      this.fiveDaysWeatherDataReadySignal.set(false)
          this.cityDetails = globalCitySignal()
          if(!!this.cityDetails) {
            this.getForecast(this.cityDetails)
          }
        })
  }

  getForecast(cityDetails: CityDetails) {
    this.fiveDaysWeatherRetrievingDataSignal.set(true)
    combineLatest([timer(1500), this.weatherService.getFiveDaysForecast(cityDetails.location[0], cityDetails.location[1])])
    .pipe(
      map(x => x[1])
    ).subscribe({
      next: result =>{
        if(result) {
          globalFiveDaysSignal.set(result)
          this.fiveDaysWeatherRetrievingDataSignal.set(false)
          this.fiveDaysWeatherData = result
          this.createChart()
        }
      }
    })
  }

  createChart() {
    let filteredData = this.filterForecastForHour()
    let labels = this.createLabels(filteredData!)
    let temperatureData = filteredData!.map(item => item.main.temp);
    let precipitationData = filteredData!.map(item => {
      if(!item.rain?.['3h']) {
        return 0
      } else {
        return item.rain?.['3h']
      }
    })
    console.log(precipitationData)

    const animation: any = {
      y: {
        easing: 'easeInOutElastic',
        from: (ctx: any) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
            }
          }
          return undefined;
        }
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }


    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: temperatureData,
            borderColor: 'rgb(239,83,80)',
            yAxisID: 'y'
          },
          {
            label: 'Precipitation',
            data: precipitationData,
            borderColor: 'rgb(41,182,246)',
            yAxisID: 'y1'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            min: -40,
            max: 60,
            ticks: {
              stepSize: 5
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 150,
            ticks: {
              stepSize: 10
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    })
    this.fiveDaysWeatherDataReadySignal.set(false)
  }

  createLabels(filteredData: List[]) {
    return filteredData.map(item => {
      const date = new Date(item.dt_txt)
      return formatDate(date, 'd-M HH:mm', 'it-IT')
    })
  }


  filterForecastForHour() {
    const allowedTimes = ['00:00:00', '12:00:00', '15:00:00', '21:00:00'];

    return this.fiveDaysWeatherData?.list.filter(item => {
      const time = item.dt_txt.split(' ')[1]
      return allowedTimes.includes(time)
    })
  }

}
