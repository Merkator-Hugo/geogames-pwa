import { Injectable } from '@angular/core';
import { GameLocation } from '../model/utils/game-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private currentLocation = new GameLocation(5.6464749, 51.7330457, 'EPSG:4326');

  constructor() { }

  getCurrentLocation(): GameLocation {
    return this.currentLocation;
  }

}
