import { Component, Input, Output } from '@angular/core';
import { Icon, LeafletMouseEvent, MapOptions, icon, latLng, marker, tileLayer } from 'leaflet';
import { IActivity, ILatLong } from 'src/app/models/Trip';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent {
  @Input() inputMode: boolean = false;
  @Input() doubleLocations: boolean = false;
  @Input() activities: IActivity[] = [];
  // @Output() map$: EventEmitter<L.Map> = new EventEmitter;
  @Output() startLocation: ILatLong | undefined;
  @Output() endLocation: ILatLong | undefined;

  options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 1,
    center: latLng(0, 0)
  };
  public map: L.Map | undefined;
  public zoom: number;

  constructor() {
    this.zoom = this.options.zoom || 1;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.clearAllEventListeners;
      this.map.remove();
    }
  };

  onMapReady(map: L.Map) {
    this.map = map;
    // this.map$.emit(map);
    this.zoom = map.getZoom();
  }

  //places markers on the map for each activity with a polyline connecting them from first to last
  placeMarkers() {
    if (this.activities.length > 0) {
      this.activities.forEach((activity) => {
        if (activity.location?.latitude === undefined || activity.location?.longitude === undefined) return;
        const leafMarker = marker([activity.location.latitude, activity.location.longitude], {
          icon: icon({
            ...Icon.Default.prototype.options,
            iconUrl: 'assets/marker-icon.png',
            iconRetinaUrl: 'assets/marker-icon-2x.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        });
        if (this.map) leafMarker.addTo(this.map);
      });
    }
  }

  onMapClick($event: LeafletMouseEvent) {
    if (!this.inputMode) return;
    //if the map is on input mode (i.e. the user is adding a new activity) then add a marker to the map and capture the coordinates
    const leafMarker = marker($event.latlng, {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
    if (this.map) leafMarker.addTo(this.map);
    //if startLocation is undefined && doubleLocations=true set it, otherwise it is the endLocation
    if (this.doubleLocations) {
      this.startLocation = { latitude: $event.latlng.lat, longitude: $event.latlng.lng };
    } else {
      this.endLocation = { latitude: $event.latlng.lat, longitude: $event.latlng.lng };
    }
  }

  ngOnDestory() {
    if (this.map) {
      this.map.clearAllEventListeners;
      this.map.off();
      this.map.remove();
    }
  }
}
