import { NgModule } from '@angular/core';

import { LocationsComponent } from './locations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  declarations: [
    LocationsComponent
  ],
  imports: [
    SharedModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
