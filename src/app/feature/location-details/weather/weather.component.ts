import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  NgZone,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { btnCollapseAnimation } from 'src/app/root/animations';
import { WeatherData, List } from 'src/app/core/models';

@Component({
  selector: 'wa-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [btnCollapseAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Input() weatherData: WeatherData;
  @Input() timezoneOffset: string;
  @Input() forecastDay: List[];
  isCollapsed = true;
  private unsubscribe = new Subject<any>();

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.calc();
    this.zone.runOutsideAngular(() =>
      fromEvent(window, 'resize')
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => this.calc()),
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  private calc() {
    const pageX = document.documentElement.clientWidth;
    if (pageX >= 752 && this.isCollapsed) {
      this.isCollapsed = false;
      this.cdr.detectChanges();
    }
  }
}
