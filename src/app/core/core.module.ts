import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GeolocationService } from './services/geolocation.service';
import { LocationManagementService } from './services/location-management.service';
import { NotificationCenterService } from './services/notification-center.service';
import { TagService } from './services/tag.service';
import { WeatherService } from './services/weather.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    GeolocationService,
    LocationManagementService,
    NotificationCenterService,
    TagService,
    WeatherService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
