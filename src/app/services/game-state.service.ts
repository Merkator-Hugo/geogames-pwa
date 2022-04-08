import { Injectable } from '@angular/core';
import { ZoneObject } from '../model/objects/zone-object';
import { Directions } from '../model/utils/directions.enum';
import { GameLocation } from '../model/utils/game-location';
import { LocationService } from './location.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {


  public player = {
    location: (): GameLocation => this.currentLocation,
    move: (direction: Directions, speed: number): GameLocation => {
      this.currentLocation.move(direction, speed);
      this.mapService.refreshPlayerLayer(this.currentLocation);
      return this.currentLocation;
    }
  };
  private currentLocation: GameLocation;
  private zones: ZoneObject[];

  constructor(
    private locationService: LocationService,
    private mapService: MapService
    ) {
    this.currentLocation = this.locationService.getCurrentLocation();
   }

}
