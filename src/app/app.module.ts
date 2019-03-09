import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details/location-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    LocationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LowerCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
