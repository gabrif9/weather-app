import { Pipe, PipeTransform } from '@angular/core';
import { CurrentWeather } from '../models/current-weather.model';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: CurrentWeather): unknown {
    const unixTime = value.dt;
    const timezoneOffsetSeconds = value.timezone;

    const localDate = new Date((unixTime + timezoneOffsetSeconds) * 1000)

    
    return formatDate(localDate, 'd-MMMM HH:mm', 'en-US');
  }

}
