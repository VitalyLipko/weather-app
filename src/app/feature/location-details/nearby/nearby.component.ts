import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { WeatherData } from 'src/app/core/models';

@Component({
  selector: 'wa-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NearbyComponent implements OnInit {
  @Input() list: WeatherData[];
  @Output() open = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  trackByItem(index, item) {
    return index;
  }
}
