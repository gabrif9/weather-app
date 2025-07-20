import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { take, timer } from 'rxjs';

export interface ToastDetails {
  message: string,
  class: string,
  time?: number
}

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  toastDetails = input<ToastDetails>()

  toastDetailsToShow?: ToastDetails

  constructor() {
    effect(() => {
      this.toastDetailsToShow = this.toastDetails()
      if(this.toastDetailsToShow) {
        timer(this.toastDetailsToShow.time ? this.toastDetailsToShow.time : 1500).pipe(take(1)).subscribe(() => {
          this.toastDetailsToShow = undefined
        })
      }
    })
  }

}
