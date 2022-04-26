import { EventEmitter, Injectable } from '@angular/core';
import View from 'ol/View';
import { CartStart } from '../model/cartridge/cart-start';
import { ObjectRef } from '../model/objects/object-ref';
import { PersonObject } from '../model/objects/person-object';
import { ToolObject } from '../model/objects/tool-object';
import { ZoneObject } from '../model/objects/zone-object';
import { EventTypes } from '../model/enums/event-types.enum';
import { GameLocation } from '../model/utils/game-location';
import { GameModes } from '../model/enums/game-modes.enum';
import { ObjectTypes } from '../model/enums/object-types.enum';
import { LocationService } from './location.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  public modeChanged: EventEmitter<GameModes> = new EventEmitter();

  public gui = {
    showLocation: {
      set: (state: boolean): boolean => this.showLocation = state,
      get: (): boolean => this.showLocation,
      toggle: (): boolean => this.showLocation = !this.showLocation
    }
  };
  public gameMode = {
    getAll: (): GameModes[] => Object.values(GameModes).filter(item => isNaN(Number(item))),
    set: (mode: GameModes): void => {
      this.currentGameMode = mode;
      this.modeChanged.emit(this.currentGameMode);
    },
    current: (): GameModes => this.currentGameMode,
    isPlay: (): boolean => this.currentGameMode === GameModes.ePlay,
    isDemo: (): boolean => this.currentGameMode === GameModes.eDemo,
    isCreate: (): boolean => this.currentGameMode === GameModes.eCreate
  };
  public start = {
    set: (values: CartStart): CartStart => this.startValues = values,
    getView: (): View => this.startValues.view,
    getPlayer: (): GameLocation => this.startValues.player
  };
  public player = {
    location: {
      get: (): GameLocation => this.currentLocation,
      set: (location: GameLocation): GameLocation => this.currentLocation = location
    }
  };
  public zones = {
    clear: (): ZoneObject[] => this.zonesObject = [],
    count: (): number => this.zonesObject.filter((zone) => zone.isVisible).length,
    get: (): ZoneObject[] => this.zonesObject,
    add: (wkt: string, id: string, name: string, isVisible: boolean, isActive: boolean): void => {
      const newZone = new ZoneObject(id, name, wkt, isVisible, isActive);
      this.zonesObject.push(newZone);
      this.mapService.zones.add(newZone);
    },
    setVisibility: (id: string, isVisible: boolean): void => {
      const zone = this.zonesObject.find((z) => z.id === id);
      zone.setVisibility(isVisible);
      this.mapService.zones.setVisibility(zone, isVisible);
    },
    setActivation: (id: string, isActive: boolean): void => {
      const zone = this.zonesObject.find((z) => z.id === id);
      zone.setActivation(isActive);
      this.mapService.zones.setActivation(zone, isActive);
    },
    checked: {
      get: (): ObjectRef[] => this.checkedZones,
      set: (zones: ObjectRef[]): ObjectRef[] => this.checkedZones = zones
    }
  };
  public persons = {
    clear: (): PersonObject[] => this.personsObject = [],
    count: (): number => this.personsObject.length
  };
  public tools = {
    clear: (): ToolObject[] => this.toolsObject = [],
    count: (): number => this.toolsObject.length
  };
  public actions = {
    add: (objectType: ObjectTypes, id: string, event: EventTypes, actionIds: string): void => {
      switch(objectType) {
        case ObjectTypes.eZone:
          const object = this.zonesObject.find((z) => z.id === id);
          object.addActions(event, actionIds);
          break;
      }
    },
  };
  private startValues: CartStart;
  private currentLocation: GameLocation;
  private zonesObject: ZoneObject[] = [];
  private personsObject: PersonObject[] = [];
  private toolsObject: ToolObject[] = [];
  private checkedZones: ObjectRef[] = [];
  // private demoState: boolean;
  private currentGameMode: GameModes;
  private showLocation: boolean;

  constructor(
    private locationService: LocationService,
    private mapService: MapService,
    ) {
    this.currentLocation = this.locationService.getCurrentLocation();
    this.init();
  }

  public run() {
    this.mapService.view.refresh(this.start.getView());
    this.mapService.player.add(this.start.getPlayer());
  }

  private init() {
    this.currentGameMode = GameModes.eDemo;
    this.showLocation = true; //false;
  }

}
