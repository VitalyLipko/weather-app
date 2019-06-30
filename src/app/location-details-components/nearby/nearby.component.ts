import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WeatherData } from 'src/app/services/weather.service';

@Component({
  selector: 'nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {
  @Input() list: WeatherData[];
  @Output() open = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  trackByItem(index, item) {
    return index;
  }
}
