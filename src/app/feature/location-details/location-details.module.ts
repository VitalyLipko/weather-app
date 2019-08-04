import { NgModule } from '@angular/core';

import { LocationDetailsComponent } from './location-details.component';
import { ForecastComponent } from './forecast/forecast.component';
import { NearbyComponent } from './nearby/nearby.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { WeatherComponent } from './weather/weather.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationCardComponent } from 'src/app/shared/location-card/location-card.component';
import { LocationsDetailsRoutingModule } from './locations-details-routing.module';

@NgModule({
  declarations: [ 
    LocationDetailsComponent,
    ForecastComponent,
    NearbyComponent,
    NotificationCenterComponent,
    WeatherComponent
  ],
  imports: [
    SharedModule,
    LocationsDetailsRoutingModule
  ],
  entryComponents: [
    LocationCardComponent
  ]
})
export class LocationDetailsModule { }
