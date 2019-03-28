import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationSearchComponent } from './location-search/location-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    LocationDetailsComponent,
    LocationSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LowerCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
