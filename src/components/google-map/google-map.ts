/// <reference types="@types/googlemaps" />
import { Component, ViewChild, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { UserLocation } from '../../interfaces/interface';
import { LocationProvider } from '../../providers/location/location';

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
  center: any;


  constructor(private geoLocation: Geolocation, public locationProvider: LocationProvider) {
    console.log('Hello GoogleMapComponent Component');

  }

  ngOnInit() {
    //   /*getting geolocaton of user*/
    this.getMarker();
  }

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
        zoom: 3,
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
    this.locationProvider.getAllLocations().then(data => {
      let locationList = Object.keys(data);

      this.geoLocation.getCurrentPosition().then((res) => {
        this.center = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        };
        let mapOption: google.maps.MapOptions = {
          center: new google.maps.LatLng(this.center.latitude, this.center.longitude),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);


        locationList.forEach(item => {
          let key = data[item];
          let latlng = new google.maps.LatLng(key.latitude, key.longitude);

          new google.maps.Marker({
            map: this.map,
            position: latlng,
          });

        });
      });
    }).catch((err) => {
      console.log(err);
    });

  }

}
