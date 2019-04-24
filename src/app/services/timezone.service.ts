import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

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
    ).pipe(retry(3), catchError(this.handleError));
  }

  saveTimezoneDataStorage(data: TimezoneData) {
    this.timezoneDataStorage.next(data);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`TimezomeDB API returned code ${error.status} ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }
}
