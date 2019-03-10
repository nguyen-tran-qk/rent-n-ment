import { Component, ViewChild } from '@angular/core';

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

  constructor() {
    console.log('Hello GoogleMapComponent Component');
  }

  ngOnInit() {

    let coordinates = new google.maps.LatLng(40, 50);
    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


}
