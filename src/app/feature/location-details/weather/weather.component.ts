import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { btnCollapseAnimation } from 'src/app/root/animations';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherData } from 'src/app/core/models/weather-data.model';
import { List } from 'src/app/core/models/list.model';

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
