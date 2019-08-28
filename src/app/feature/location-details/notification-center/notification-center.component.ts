import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { List } from 'src/app/core/models/list.model';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCenterComponent implements OnInit {
  @Input() timezoneOffset: string;
  @Input() pressureData: [List, number];
  @Input() precipitationData: List[];
  @Input() tempData: [List, number];
  @Input() windData: List;
  @Input() notification: boolean;
  @Output() close = new EventEmitter<any>();

  changeTemp: string;
  changePressure: string;

  constructor() { }

  ngOnInit() {
    if (this.pressureData) {
      this.changePressure = this.changeValue(this.pressureData[1]);
    }
    if (this.tempData) {
      this.changeTemp = this.changeValue(this.tempData[1]);
    }
  }

  private changeValue(delta: number): string {
    return delta > 0 ? 'понижение' : 'повышение';
  }

  onClose() {
    this.close.emit(null);
  }

}
