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
  map: any = null;
  lat: any = 40;
  lng: any = 45;

  constructor(private geoLocation: Geolocation) {
    console.log('Hello GoogleMapComponent Component');
  }

  ngOnInit() {
    /*getting geolocaton of user*/
    this.getCurrentLocation();
  }


  getCurrentLocation(){
    /*  list of coordinates are retrieved from users locaiton when they upload their items or update their profile*/

    let coordinates1 = new google.maps.LatLng(60.2, 24.8);
    let coordinates2 = new google.maps.LatLng(60.6, 24.7);

    let mapOption: google.maps.MapOptions = {
      center: coordinates1,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
    /*each marker represents one user considering multiple item can be uploaded by same user from same location*/
    let marker1: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coordinates1,
    });

    let marker2: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coordinates2,
    })
  }
}
