import { Component, OnInit, Input } from '@angular/core';

import { WeatherData, WeatherService, List } from 'src/app/services/weather.service';
import { btnCollapseAnimation } from 'src/app/animations';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [btnCollapseAnimation]
})
export class WeatherComponent implements OnInit {
  @Input() weatherData: WeatherData;
  @Input() timezoneOffset: string;
  @Input() forecastDay: List[];
  isCollapsed: boolean = true;
  constructor(public weather: WeatherService) { }

  ngOnInit() {
  }

}
