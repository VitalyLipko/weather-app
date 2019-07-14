import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

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
  isDataLoaded$: Observable<boolean>;

  constructor(
    public geolocation: GeolocationService,
    private weather: WeatherService,
    private seo: TagService
  ) { }

  ngOnInit() {
    this.seo.setPageTitle('Weather App | Страница поиска');
    this.seo.setPageDescription('');
    this.seo.setMetaRobots('index, follow');
    this.errorStatus$ = this.weather.errorStatus$;
    this.errorCode$ = this.geolocation.errorCode$;
    this.isDataLoaded$ = this.weather.isDataLoaded$.pipe(startWith(true));
  }
}
