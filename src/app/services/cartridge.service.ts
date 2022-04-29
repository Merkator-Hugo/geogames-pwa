import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import View from 'ol/View';
import { GameAction } from '../model/actions/game-action';
import { CartStart } from '../model/cartridge/cart-start';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/enums/object-types.enum';
import { GameStateService } from './game-state.service';
import { ActionsService } from './actions.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  private cartridgeUrl = '/assets/cartridges/test.json';
  private cartridge;

  constructor(
    private actions: ActionsService,
    private gamestate: GameStateService,
    private mapService: MapService,
    private httpClient: HttpClient
  ) { }

  clear() {
    this.gamestate.zones.clear();
    this.gamestate.persons.clear();
    this.gamestate.tools.clear();
    this.actions.clear();
    this.mapService.player.clear();
    this.mapService.zones.clear();
  }

  load() {
    this.clear();
    this.httpClient.get('/assets/cartridges/test.json').subscribe(
      (result) => {
        this.cartridge = result;
        this.handleCartridge();
      }
    );
  }

  get() {
    return this.cartridge;
  }

  private handleCartridge() {
    const actions: Map<string, GameAction> = new Map();
    const start = new CartStart();
    start.view.set(
      new View({
        center: new GameLocation(this.cartridge.start.view.center[0], this.cartridge.start.view.center[1], 'EPSG:4326').getCoords(),
        zoom: this.cartridge.start.view.zoom
      })
    );
    start.player.set(
      new GameLocation(this.cartridge.start.player[0], this.cartridge.start.player[1], 'EPSG:4326')
    );
    this.gamestate.start.set(start);
    this.cartridge.actions.forEach((action) => {
      this.actions.set(action.id, new GameAction(action.id, action.type, action.name, action.payload));
    });
    this.cartridge.zones.forEach((zone) => {
      this.gamestate.zones.add(zone.zone, zone.id, zone.name, zone.isVisible, zone.isActive);
      zone.actions.forEach((action) => {
        this.gamestate.actions.add(ObjectTypes.eZone, zone.id, action.event, action.ids);
      });
    });
    this.gamestate.run();
  }

}
