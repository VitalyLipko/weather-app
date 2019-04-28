import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationDetailsComponent } from './location-details-components/location-details/location-details.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { Page404Component } from './page404/page404.component';
import { WeatherComponent } from './location-details-components/weather/weather.component';
import { ForecastComponent } from './location-details-components/forecast/forecast.component';
import { environment } from '../environments/environment';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    LocationDetailsComponent,
    LocationSearchComponent,
    Page404Component,
    WeatherComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LowerCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
