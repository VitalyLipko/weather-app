import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotificationCenterService } from 'src/app/services/notification-center.service';
import { List } from 'src/app/services/weather.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
  @Input() weatherData: List;
  @Input() forecastData: List[];
  @Input() timezoneOffset: string;
  @Output() ringing = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<any>();
  pressureData: [List, number];
  precipitationData: List[] = [];
  tempData: [List, number];
  windData: List;
  notification = false;

  constructor(private notificationCenterService: NotificationCenterService) { }

  ngOnInit() {
    this.pressureData = this.notificationCenterService.pressureNotify(this.weatherData, this.forecastData);
    if (this.pressureData) this.notification = true;
    this.precipitationData = this.notificationCenterService.precipitationNotify(this.forecastData);
    if (this.precipitationData[0]) this.notification = true;
    this.tempData = this.notificationCenterService.tempNotify(this.weatherData, this.forecastData);
    if (this.tempData) this.notification = true;
    this.windData = this.notificationCenterService.windNotify(this.forecastData);
    if (this.windData) this.notification = true;
    this.ringing.emit(this.notification);
  }

  changeValue(delta: number): string {
    if (delta > 0) return 'понижение';
    return 'повышение';
  }

  typeOfPrecipitation(id: number): string {
    if (id >= 200 && id < 300) return 'гроза';
    else if (id >= 502 && id < 600) return 'сильный дождь';
    else if (id === 602 || id === 622) return 'сильный снегопад';
  }

  onClose() {
    this.close.emit(null);
  }

}
