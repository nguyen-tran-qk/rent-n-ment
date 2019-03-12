/// <reference types="@types/googlemaps" />
import { Component, ViewChild, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { UserLocation } from '../../interfaces/interface';

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
  @Input() location: UserLocation;
  @ViewChild('map') mapElement;
  map: any = null;
  lat: any = 40;
  lng: any = 45;

  constructor(private geoLocation: Geolocation) {
    console.log('Hello GoogleMapComponent Component');
  }

  // ngOnInit() {
  //   /*getting geolocaton of user*/
  //  this.getMarker();
  // }

  ngOnChanges(changes) {
    if (changes.location.currentValue) {
      const location = changes.location.currentValue as UserLocation;
      this.markCurrentLocation(location);
    }
  }

  markCurrentLocation(coords: UserLocation) {
    if (coords) {
      const coordinates = new google.maps.LatLng(coords.latitude, coords.longitude);
      const mapOption: google.maps.MapOptions = {
        center: coordinates,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
      new google.maps.Marker({
        map: this.map,
        position: coordinates,
      });
    }
  }

  getMarker() {

    let coordinates1 = new google.maps.LatLng(60, 24);
    let coordinates2 = new google.maps.LatLng(60.6, 24.7);

    let mapOption: google.maps.MapOptions = {
      center: coordinates1,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);

    let marker1: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coordinates1,
    });

    let marker2: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coordinates2,
    });
  }
}
