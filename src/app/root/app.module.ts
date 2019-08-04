import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData, LowerCasePipe } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { environment } from 'src/environments/environment';
import { WeatherParamsPipe } from '../shared/pipes/weather-params.pipe';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule
  ],
  providers:[
    LowerCasePipe, 
    WeatherParamsPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
