import { Injectable, EventEmitter } from '@angular/core';
import View from 'ol/View';
import { GameActions } from '../model/actions/game-actions';
import { CartStart } from '../model/cartridge/cart-start';
import { ObjectRef } from '../model/objects/object-ref';
import { PersonObject } from '../model/objects/person-object';
import { ToolObject } from '../model/objects/tool-object';
import { ZoneObject } from '../model/objects/zone-object';
import { ActionTypes } from '../model/utils/action-types.enum';
import { Directions } from '../model/utils/directions.enum';
import { EventTypes } from '../model/utils/event-types.enum';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { LocationService } from './location.service';
import { MapService } from './map.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  public start = {
    set: (values: CartStart): CartStart => this.startValues = values,
    getView: (): View => this.startValues.view,
    getPlayer: (): GameLocation => this.startValues.player
  };
  public player = {
    location: (): GameLocation => this.currentLocation,
    move: (direction: Directions, speed: number): GameLocation => {
      this.currentLocation.move(direction, speed);
      this.mapService.player.refresh(this.currentLocation);
      const view = this.mapService.view.get();
      view.setCenter(this.currentLocation.getCoords());
      this.mapService.view.refresh(view);
      setTimeout(this.zones.check, 500);
      return this.currentLocation;
    }
  };
  public zones = {
    count: (): number => this.zonesObject.length,
    add: (wkt: string, id: string, isVisible: boolean, isActive: boolean): void => {
      const newZone = new ZoneObject(id, wkt, isVisible, isActive);
      this.zonesObject.push(newZone);
      // if(isActive) {
        this.mapService.zones.add(newZone);
      // }
    },
    check: () => {
      const oldCheckedZones = this.checkedZones.map(e => ({ ... e }));
      this.checkedZones = this.mapService.zones.check(this.currentLocation);
      const stayedZones = this.checkedZones.filter(value => oldCheckedZones.some(value2 => value2.id === value.id));
      stayedZones.forEach((zone) => {
        switch(zone.type) {
          case ObjectTypes.eZone:
            const object = this.zonesObject.find((z) => z.id === zone.id);
            const actions = object.getActions(EventTypes.eStayInZone);
            this.actions.start(actions);
            break;
        }
      });
      const enteredZones = this.checkedZones.filter(value => !oldCheckedZones.some(value2 => value2.id === value.id));
      enteredZones.forEach((zone) => {
        switch(zone.type) {
          case ObjectTypes.eZone:
            const object = this.zonesObject.find((z) => z.id === zone.id);
            const actions = object.getActions(EventTypes.eEnterZone);
            this.actions.start(actions);
            break;
        }
      });
      const leftZones = oldCheckedZones.filter(value => !this.checkedZones.some(value2 => value2.id === value.id));
      leftZones.forEach((zone) => {
        switch(zone.type) {
          case ObjectTypes.eZone:
            const object = this.zonesObject.find((z) => z.id === zone.id);
            const actions = object.getActions(EventTypes.eLeaveZone);
            this.actions.start(actions);
            break;
        }
      });
    },
    setVisibility: (id: string, isVisible: boolean): void => {
      const zone = this.zonesObject.find((z) => z.id === id);
      zone.setVisibility(isVisible);
      this.mapService.zones.setVisibility(zone, isVisible);
      // if (isVisible) {
      //   this.mapService.zones.add(zone);
      // } else {
      //   this.mapService.zones.remove();
      // }
    },
    setActivation: (id: string, isActive: boolean): void => {
      const zone = this.zonesObject.find((z) => z.id === id);
      zone.setActivation(isActive);
      this.mapService.zones.setActivation(zone, isActive);
    }
  };
  public persons = {
    count: (): number => this.personsObject.length
  };
  public tools = {
    count: (): number => this.toolsObject.length
  };
  public actions = {
    start: (actions: GameActions) => {
      if (actions === null) {
        this.utils.log.add('No actions found');
      } else {
        this.handleActions(actions);
      }
    },
    add: (objectType: ObjectTypes, id: string, event: EventTypes, actions: GameActions): void => {
      switch(objectType) {
        case ObjectTypes.eZone:
          const object = this.zonesObject.find((z) => z.id === id);
          object.addAction(event, actions);
          break;
      }
    },
  };
  public demo = {
    get: (): boolean => this.demoState,
    set: (state: boolean): boolean => this.demoState = state
  };
  private startValues: CartStart;
  private currentLocation: GameLocation;
  private zonesObject: ZoneObject[] = [];
  private personsObject: PersonObject[] = [];
  private toolsObject: ToolObject[] = [];
  private checkedZones: ObjectRef[] = [];
  private demoState: boolean;

  constructor(
    private locationService: LocationService,
    private mapService: MapService,
    private utils: UtilsService
    ) {
    this.currentLocation = this.locationService.getCurrentLocation();
  }

  public run() {
    this.mapService.view.refresh(this.start.getView());
    this.mapService.player.add(this.start.getPlayer());
  }

  private handleActions(actions) {
    actions.actions.forEach(action => {
      switch(action.type) {
        case ActionTypes.eMessage:
          this.utils.toast.present(action.payload.message);
          break;
        case ActionTypes.eActivation:
          switch(action.payload.type) {
            case ObjectTypes.eZone:
              this.zones.setActivation(action.payload.id, action.payload.state);
              break;
          }
          break;
        case ActionTypes.eVisibility:
          switch(action.payload.type) {
            case ObjectTypes.eZone:
              this.zones.setVisibility(action.payload.id, action.payload.state);
              break;
          }
          break;
        }
    });
  }

}
