import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'urlSanitizer'
})
export class UrlSanitizerPipe implements PipeTransform {

  sanitizer = inject(DomSanitizer)

  transform(value: string): SafeUrl {
    return  this.sanitizer.bypassSecurityTrustUrl('https://openweathermap.org/img/wn/'+ value + '@2x.png')
  }

}
