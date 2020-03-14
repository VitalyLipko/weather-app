import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { GroupWeatherData, WeatherData } from 'src/app/core/models';
import {
  WeatherService,
  LocationManagementService,
  TagService,
} from 'src/app/core/services';

@Component({
  selector: 'wa-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  groupWeatherData$: Observable<GroupWeatherData>;

  constructor(
    private weather: WeatherService,
    public locationManagement: LocationManagementService,
    private seo: TagService,
  ) {}

  ngOnInit() {
    this.seo.setPageTitle('Weather App | Мои места');
    this.seo.setPageDescription('');
    this.seo.setMetaRobots('noindex, nofollow');
    if (localStorage.getItem('locations')) {
      this.locationManagement.locations = JSON.parse(
        localStorage.getItem('locations'),
      );
    }
    if (this.locationManagement.locations.length) {
      let idList = '';
      this.locationManagement.locations.forEach((location, index, array) => {
        if (index !== array.length - 1) {
          idList += location.id.toString() + ',';
        } else {
          idList += location.id.toString();
        }
      });
      this.groupWeatherData$ = this.weather.getGroupWeatherData(idList).pipe(
        // tslint:disable-next-line: whitespace
        startWith(<GroupWeatherData>{
          cnt: 0,
          list: new Array<WeatherData>(
            this.locationManagement.locations.length,
          ),
        }),
        tap(data => (this.locationManagement.groupWeatherData = data)),
      );
    }
  }

  trackByFn(index, item) {
    return index;
  }
}
