import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { GroupWeatherData, WeatherData } from 'src/app/core/models';
import {
  WeatherService,
  FavoritesService,
  TagService,
} from 'src/app/core/services';

@Component({
  selector: 'wa-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  groupWeatherData$: Observable<GroupWeatherData>;
  private favoritesIds = '';

  constructor(
    private weather: WeatherService,
    public favoritesService: FavoritesService,
    private seo: TagService,
  ) {
    if (this.favoritesService.favorites.length) {
      this.favoritesService.favorites.forEach((location, index, array) => {
        if (index !== array.length - 1) {
          this.favoritesIds += location.id.toString() + ',';
        } else {
          this.favoritesIds += location.id.toString();
        }
      });
    }
  }

  ngOnInit() {
    this.seo.setPageTitle('Weather App | Мои места');
    this.seo.setPageDescription('');
    this.seo.setMetaRobots('noindex, nofollow');
    if (this.favoritesIds) {
      this.groupWeatherData$ = this.weather
        .getGroupWeatherData(this.favoritesIds)
        .pipe(
          startWith(<GroupWeatherData>{
            cnt: 0,
            list: new Array<WeatherData>(
              this.favoritesService.favorites.length,
            ),
          }),
          tap(data => (this.favoritesService.groupWeatherData = data)),
        );
    }
  }

  trackByFn(index: number, item: WeatherData): number {
    return index || item?.id;
  }
}
