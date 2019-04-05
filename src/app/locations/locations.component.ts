import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';
import { LocationManagementService } from '../location-management.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(public weather: WeatherService, public locationManagement: LocationManagementService) { }

  ngOnInit() {
    if(localStorage.getItem('locations'))
      this.locationManagement.locations = JSON.parse(localStorage.getItem('locations'));
    if (this.locationManagement.locations.length) {
      let idList: string = '';
      this.locationManagement.locations.forEach((location, index, array) => {
        if (index !== (array.length - 1)) {
          idList += location.id.toString() + ',';
        } else idList += location.id.toString();
      });
      this.subscriptions.add(this.weather.getGroupWeatherData(idList).subscribe(groupWeatherData =>
        this.locationManagement.groupWeatherData = groupWeatherData
      ));
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }
}
