import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLocation } from '../../interfaces/interface';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  myjsonAPI = 'https://api.myjson.com/bins/';
  myjsonID = 'hrpr6';
  locationsData: { [user_id: string]: UserLocation };

  constructor(public http: HttpClient) {
    console.log('Hello LocationProvider Provider');
    this.getAllLocations().then(data => {
      this.locationsData = data;
    });
  }

  async getAllLocations() {
    const res = await fetch(this.myjsonAPI + this.myjsonID);
    return await res.json() as { [user_id: string]: UserLocation };
  }

  async updateLocations(data: { [user_id: string]: UserLocation }) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const res = await fetch(this.myjsonAPI + this.myjsonID, { method: 'PUT', headers, body: JSON.stringify(data) });
    return await res.json();
  };
}
