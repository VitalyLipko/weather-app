import { NgModule } from '@angular/core';

import { Page404Component } from './page404.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page404RoutingModule } from './page404-routing.module';

@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    SharedModule,
    Page404RoutingModule
  ]
})
export class Page404Module { }
