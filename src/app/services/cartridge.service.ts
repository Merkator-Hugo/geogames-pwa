import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import View from 'ol/View';
import { GameAction } from '../model/actions/game-action';
import { CartStart } from '../model/cartridge/cart-start';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from './game-state.service';
import { ActionsService } from './actions.service';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  private cartridge;

  constructor(
    private actions: ActionsService,
    private gamestate: GameStateService,
    private httpClient: HttpClient
  ) { }

  load() {
    this.httpClient.get('/assets/cartridges/test.json').subscribe(
      (result) => {
        this.cartridge = result;
        this.handleCartridge();
      }
    );
  }

  private handleCartridge() {
    const actions: Map<string, GameAction> = new Map();
    this.gamestate.start.set(
      new CartStart(
        new View({
          center: new GameLocation(this.cartridge.start.view.center[0], this.cartridge.start.view.center[1], 'EPSG:4326').getCoords(),
          zoom: this.cartridge.start.view.zoom
        }),
        new GameLocation(this.cartridge.start.player[0], this.cartridge.start.player[1], 'EPSG:4326')
      )
    );
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
