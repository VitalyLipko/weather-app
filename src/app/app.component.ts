import { Component, OnInit } from '@angular/core';

import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private geolocation: GeolocationService) { }

  ngOnInit() {
    if (this.geolocation.isAvailable()) {
      console.log('Geolocation is available');
      this.geolocation.getCurrentPosition();
    } else console.log('Geolocation is not available');
  }
}
