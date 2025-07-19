import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchLocationComponent } from "../search-location/search-location.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SearchLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
