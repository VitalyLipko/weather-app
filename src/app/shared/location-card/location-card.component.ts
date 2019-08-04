import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { WeatherData } from 'src/app/core/models/weather-data.model';

@Component({
  selector: 'location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCardComponent implements OnInit {
  @Input() location: WeatherData;
  @Input() enableClosing: boolean;
  @Output() close = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
}
