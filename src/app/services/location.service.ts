import { Injectable } from '@angular/core';
import { Directions } from '../model/utils/directions.enum';
import { GameLocation } from '../model/utils/game-location';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private currentLocation = new GameLocation(5.6464749, 51.7330457, 'EPSG:4326');

  constructor() { }

  getCurrentLocation(): GameLocation {
    return this.currentLocation;
  }

  move(direction: Directions, speed: number): GameLocation {
    this.currentLocation.move(direction, speed);
    return this.currentLocation;
  }
}
