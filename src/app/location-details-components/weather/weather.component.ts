import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { WeatherData, WeatherService, List } from 'src/app/services/weather.service';
import { btnCollapseAnimation } from 'src/app/animations';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [btnCollapseAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  @Input() weatherData: WeatherData;
  @Input() timezoneOffset: string;
  @Input() forecastDay: List[];
  isCollapsed = true;
  constructor(public weather: WeatherService) { }

  ngOnInit() {
  }

}
