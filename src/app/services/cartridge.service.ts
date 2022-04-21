import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import View from 'ol/View';
import { GameAction } from '../model/actions/game-action';
import { GameActions } from '../model/actions/game-actions';
import { CartStart } from '../model/cartridge/cart-start';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  private cartridge;

  constructor(
    private game: GameStateService,
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
    this.game.start.set(
      new CartStart(
        new View({
          center: new GameLocation(this.cartridge.start.view.center[0], this.cartridge.start.view.center[1], 'EPSG:4326').getCoords(),
          zoom: this.cartridge.start.view.zoom
        }),
        new GameLocation(this.cartridge.start.player[0], this.cartridge.start.player[1], 'EPSG:4326')
      )
    );
    this.cartridge.actions.forEach((action) => {
      actions.set(action.id, new GameAction(action.id, action.type, action.name, action.payload));
    });
    this.cartridge.zones.forEach((zone) => {
      this.game.zones.add(zone.zone, zone.id, zone.name, zone.isVisible, zone.isActive);
      zone.actions.forEach((action) => {
        const ids = action.ids.split(';');
        const acts = new GameActions();
        ids.forEach((id) => {
          acts.add(actions.get(id));
        });
        this.game.actions.add(ObjectTypes.eZone, zone.id, action.event, acts);
      });
    });
    this.game.run();
  }

}
