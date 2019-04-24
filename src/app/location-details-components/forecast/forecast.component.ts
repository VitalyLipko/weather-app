import { Component, OnInit, Input } from '@angular/core';

import { List } from '../../services/weather.service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input() forecastDays: List[];
  @Input() forecastNights: List[];
  @Input() timezoneOffset: string;
  constructor() { }

  ngOnInit() {
  }

}
