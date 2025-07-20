import { ChangeDetectorRef, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FiveDaysWeather, List } from '../../models/five-days-weather.mode';
import { CityDetails } from '../../models/city.mode';
import { globalCitySignal, globalFiveDaysSignal } from '../../../signal';
import { WeatherService } from '../../services/weather.service';
import { combineLatest, filter, finalize, map, timer } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
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
  imports: [CommonModule],
  templateUrl: './weather-charts.component.html',
  styleUrl: './weather-charts.component.css'
})
export class WeatherChartsComponent {

  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;

  fiveDaysWeatherDataReadySignal = signal(false)
  fiveDaysWeatherRetrievingDataSignal = signal(false)


  weatherService = inject(WeatherService)

  fiveDaysWeatherData?: FiveDaysWeather

  cityDetails?: CityDetails | null


  cdr = inject(ChangeDetectorRef)

  

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
          this.fiveDaysWeatherRetrievingDataSignal.set(false)
          globalFiveDaysSignal.set(result)
          this.fiveDaysWeatherDataReadySignal.set(true)
          this.fiveDaysWeatherData = result

          this.cdr.detectChanges()
          this.createChart()

        }
      }
    })
  }

  createChart() {
    let filteredData = this.filterForecastForHour()
    let labels = this.createLabels(filteredData!)
    console.log(labels)
    let temperatureData = filteredData!.map(item => item.main.temp);
    let precipitationData = filteredData!.map(item => {
      if(!item.rain?.['3h']) {
        return 0
      } else {
        return item.rain?.['3h']
      }
    })

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

    const ctx = this.canvasRef?.nativeElement?.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found!');
      return;
    }


    this.chart = new Chart(ctx, {
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
            title: {
              display: true,
              text: 'C°'
            },
            ticks: {
              stepSize: 5
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 150,
            title: {
              display: true,
              text: 'mm'
            },
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
