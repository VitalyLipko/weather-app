import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Coord } from './weather.service';

const apiKey = '3W1XVBCK6T6Q';

export interface TimezoneData {
  status: string;
  message: string;
  zoneName: string;
  gmtOffset: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private readonly urlApi: string = 'http://api.timezonedb.com/v2.1/get-time-zone?';
  private timezoneDataStorage = new ReplaySubject<TimezoneData>(1, 2000);
  timezoneDataStorage$ = this.timezoneDataStorage.asObservable();

  constructor(private http: HttpClient) { }

  getTimezone(position: Coord): Observable<TimezoneData> {
    return this.http.get<TimezoneData>(
      `${this.urlApi}key=${apiKey}&format=json&fields=status,message,gmtOffset,zoneName&by=position&lat=${position.lat}&lng=${position.lon}`
    );
  }

  saveTimezoneDataStorage(data: TimezoneData) {
    this.timezoneDataStorage.next(data);
  }
}
