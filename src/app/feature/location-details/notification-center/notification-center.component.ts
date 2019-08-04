import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotificationCenterService } from 'src/app/core/services/notification-center.service';
import { List } from 'src/app/core/models/list.model';

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
  changeTemp: string;
  changePressure: string;

  constructor(private notificationCenterService: NotificationCenterService) { }

  ngOnInit() {
    this.pressureData = this.notificationCenterService.pressureNotify(this.weatherData, this.forecastData);
    if (this.pressureData) {
      this.changePressure = this.changeValue(this.pressureData[1]);
      this.notification = true;
    }
    this.precipitationData = this.notificationCenterService.precipitationNotify(this.forecastData);
    if (this.precipitationData[0]) this.notification = true;
    this.tempData = this.notificationCenterService.tempNotify(this.weatherData, this.forecastData);
    if (this.tempData) {
      this.changeTemp = this.changeValue(this.tempData[1]);
      this.notification = true;
    }
    this.windData = this.notificationCenterService.windNotify(this.forecastData);
    if (this.windData) this.notification = true;
    this.ringing.emit(this.notification);
  }

  private changeValue(delta: number): string {
    if (delta > 0) return 'понижение';
    return 'повышение';
  }

  onClose() {
    this.close.emit(null);
  }

}
