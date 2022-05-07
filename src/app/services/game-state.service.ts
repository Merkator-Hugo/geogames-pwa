import { EventEmitter, Injectable } from '@angular/core';
import View from 'ol/View';
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
import * as turf from '@turf/turf';
import { GameDirections } from '../model/utils/game-directions';
import { MainObject } from '../model/objects/main-object';

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
    },
    updateArrow: () => {
      const arrows = document.getElementsByClassName('svgArrow');
      Array.from(arrows).forEach(arrow => {
        arrow.setAttribute('transform', 'rotate('+ this.player.navigateTo.directions().bearing +' 30 30)');
      });
    },
    screenWidth: {
      get: (): number => this.screenWidth,
      set: (width: number): number => this.screenWidth = width,
      isWide: (): boolean => this.screenWidth >= 400
    },
    map: {
      setImage: () => this.mapService.map.layers.setImage(this.player.location.get()),
      setOffline: () => this.mapService.map.layers.setOffline()
    }
  };
  public gameMode = {
    getAll: (): GameModes[] => Object.values(GameModes).filter(item => isNaN(Number(item))),
    set: (mode: GameModes): void => {
      this.currentGameMode = mode;
      this.modeChanged.emit(this.currentGameMode);
    },
    current: (): GameModes => this.currentGameMode,
    isHome: (): boolean => this.currentGameMode === GameModes.eHome,
    isPlay: (): boolean => this.currentGameMode === GameModes.ePlay,
    isDemo: (): boolean => this.currentGameMode === GameModes.eDemo,
    isEdit: (): boolean => this.currentGameMode === GameModes.eEdit,
    isEditable: (): boolean => !this.main.code.isSealed()
  };
  public main = {
    id: {
      get: (): string => this.mainObject.id.get(),
      set: (id: string): string => this.mainObject.id.set(id)
    },
    name: {
      get: (): string => this.mainObject.name.get(),
      set: (name: string): string => this.mainObject.id.set(name)
    },
    code: {
      get: (): string => this.mainObject.code.get(),
      set: (code: string): string => this.mainObject.id.set(code),
      isSealed: (): boolean => (this.mainObject.code.isSealed())
    },
    view: {
      set: (view: View): View => this.mainObject.view.set(view),
      get: (): View => this.mainObject.view.get(),
    },
    player: {
      set: (player: GameLocation): GameLocation => this.mainObject.player.set(player),
      get: (): GameLocation => this.mainObject.player.get()
    },
  };
  public player = {
    location: {
      get: (): GameLocation => this.currentLocation,
      set: (location: GameLocation): void => {
        this.currentLocation = location;
        this.gui.updateArrow();
      }
    },
    navigateTo: {
      clear: (): GameLocation => this.navigateTo = null,
      set: (point: GameLocation): void => {
        this.navigateTo = point;
        this.gui.updateArrow();
      },
      directions: (): GameDirections => {
        const from = turf.point(this.player.location.get().getCoords('EPSG:4326'));
        const to = turf.point(this.navigateTo.getCoords('EPSG:4326'));
        const distance = turf.distance(from, to);
        const bearing = turf.bearing(from, to);
        return new GameDirections((distance*1000), bearing);
      },
      isNavigating: (): boolean => this.navigateTo !== null,
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
  private mainObject: MainObject;
  private zonesObject: ZoneObject[] = [];
  private personsObject: PersonObject[] = [];
  private toolsObject: ToolObject[] = [];
  private checkedZones: ObjectRef[] = [];
  private currentLocation: GameLocation;
  private currentGameMode: GameModes;
  private showLocation: boolean;
  private navigateTo: GameLocation;
  private screenWidth: number;

  constructor(
    private locationService: LocationService,
    private mapService: MapService,
    ) {
      this.mainObject = new MainObject();
    this.currentLocation = this.locationService.getCurrentLocation();
    this.init();
  }

  public run() {
    this.mapService.player.add(this.main.player.get());
    this.mapService.map.layers.setOffline();
    this.mapService.view.refresh(this.main.view.get());
  }

  private init() {
    this.currentGameMode = GameModes.eHome; // GameModes.eEdit; // GameModes.eDemo;
    this.showLocation = true;
    this.navigateTo = null;
  }

}
