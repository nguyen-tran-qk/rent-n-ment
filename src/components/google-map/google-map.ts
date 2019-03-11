/// <reference types="@types/googlemaps" />
import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement;
  map: any;
  lat: any = 40;
  lng: any = 45;

  constructor(private geoLocation: Geolocation) {
    console.log('Hello GoogleMapComponent Component');
  }

  ngOnInit() {
    /*getting geolocaton of user*/
    this.getCurrentLocation();
  }


  getCurrentLocation() {
   /* this.geoLocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(this.lat, this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });*/

    /*marking geolocation of user*/
        let coordinates = new google.maps.LatLng(60.2, 24.8);
        let mapOptions: google.maps.MapOptions = {
          center: coordinates,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker: google.maps.Marker = new google.maps.Marker({
          map: this.map,
          position: coordinates,
        })
      }
}
