import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WeatherData } from '../services/weather.service';

@Component({
  selector: 'location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
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
