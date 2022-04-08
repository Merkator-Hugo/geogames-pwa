import { Injectable } from '@angular/core';
import { PersonObject } from '../model/objects/person-object';
import { ToolObject } from '../model/objects/tool-object';
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
  public zones = {
    count: (): number => this.zonesObject.length
  };
  public persons = {
    count: (): number => this.personsObject.length
  };
  public tools = {
    count: (): number => this.toolsObject.length
  };
  private currentLocation: GameLocation;
  private zonesObject: ZoneObject[] = [];
  private personsObject: PersonObject[] = [];
  private toolsObject: ToolObject[] = [];

  constructor(
    private locationService: LocationService,
    private mapService: MapService
    ) {
    this.currentLocation = this.locationService.getCurrentLocation();
   }

}
