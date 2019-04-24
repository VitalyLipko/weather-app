import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GeolocationService } from '../services/geolocation.service';
import { WeatherService } from '../services/weather.service';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  errorStatus$: Observable<number>;
  errorCode$: Observable<number>;
  constructor(
    public geolocation: GeolocationService,
    private weather: WeatherService,
    private seo: TagService
  ) { }

  ngOnInit() {
    this.seo.setPageTitle('Weather App | Страница поиска');
    this.seo.setPageDescription('');
    this.seo.setMetaRobots('noindex, nofollow');
    this.errorStatus$ = this.weather.errorStatus$;
    if (this.geolocation.isAvailable()) {
      console.log('Geolocation is available');
      if (!this.geolocation.isUsed) {
        this.geolocation.getCurrentPosition();
        this.errorCode$ = this.geolocation.errorCode$;
      }
    } else console.warn('Geolocation is unavailable');
  }
}
