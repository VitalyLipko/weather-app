import { Component, OnInit } from '@angular/core';

import { GeolocationService } from '../geolocation.service';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  constructor(public geolocation: GeolocationService, public weather: WeatherService) { }

  ngOnInit() {
    if (this.geolocation.isAvailable()) {
      console.log('Geolocation is available');
      this.geolocation.getCurrentPosition();
    } else console.warn('Geolocation is unavailable');
  }
}
