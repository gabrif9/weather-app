import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  activeTheme = signal('')

  renderer = inject(Renderer2)

  htmlQuerySelector = document.querySelector('html')

  ngOnInit(): void {

    if(localStorage.getItem('theme')) {
      this.renderer.setAttribute(this.htmlQuerySelector, 'data-theme', localStorage.getItem('theme')!)

      if(localStorage.getItem('theme') === 'dark'){
        this.renderer.removeClass(this.htmlQuerySelector, 'dark')
        this.renderer.addClass(this.htmlQuerySelector, localStorage.getItem('theme')!)
      } else {
        this.renderer.removeClass(this.htmlQuerySelector, 'cupcake')
        this.renderer.addClass(this.htmlQuerySelector, localStorage.getItem('theme')!)
      }
      this.activeTheme.set(localStorage.getItem('theme')!)
    } else {
      localStorage.setItem('theme', 'cupocake')
      this.activeTheme.set('cupcake') 
      this.renderer.setAttribute(this.htmlQuerySelector, 'data-theme', 'cupcake')
    }
      
  }

  changeTheme(){
    if(localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'cupcake')
      this.activeTheme.set('cupcake')
      this.renderer.removeClass(this.htmlQuerySelector, 'cupcake')
      this.renderer.setAttribute(this.htmlQuerySelector, 'data-theme', 'cupcake')
      this.renderer.addClass(this.htmlQuerySelector, localStorage.getItem('theme')!)
    } else {
      localStorage.setItem('theme', 'dark')
      this.activeTheme.set('dark')
      this.renderer.removeClass(this.htmlQuerySelector, 'dark')
      this.renderer.setAttribute(this.htmlQuerySelector, 'data-theme', 'dark')
      this.renderer.addClass(this.htmlQuerySelector, localStorage.getItem('theme')!)
    }
  }

}
