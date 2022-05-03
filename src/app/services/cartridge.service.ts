import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import View from 'ol/View';
import { GameAction } from '../model/actions/game-action';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/enums/object-types.enum';
import { GameStateService } from './game-state.service';
import { ActionsService } from './actions.service';
import { MapService } from './map.service';
import { Storage } from '@capacitor/storage';
import { Cartridge } from '../model/cartridge/cartridge';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  public test = {
    load: () => {
      this.httpClient.get('/assets/cartridges/test.json').subscribe(
        (result) => {
          this.cartridge = result;
          this.handleCartridge();
        }
      );
    }
  };

  public local = {
    configure: async () => {
      await Storage.configure({
        group: 'cartridges'
      });
    },
    load: async (id: string) => {
      await this.local.configure();
      const { value } = await Storage.get({ key: id });
      this.cartridge = JSON.parse(value);
      this.handleCartridge();
    },
    list: async () => {
      await this.local.configure();
      return await Storage.keys().then((result) => result);
    },
    save: async (cartridge: Cartridge) => {
      await this.local.configure();
      await Storage.set({
        key: cartridge.main.id.get() + '@' + cartridge.main.name.get(),
        value: JSON.stringify(cartridge),
      });
    },
  };

  private cartridge;

  constructor(
    private actions: ActionsService,
    private gamestate: GameStateService,
    private mapService: MapService,
    private httpClient: HttpClient
  ) { }

  public clear() {
    this.gamestate.zones.clear();
    this.gamestate.persons.clear();
    this.gamestate.tools.clear();
    this.actions.clear();
    this.mapService.player.clear();
    this.mapService.zones.clear();
  }

  public get() {
    return this.cartridge;
  }

  private handleCartridge() {
    this.clear();
    const actions: Map<string, GameAction> = new Map();
    this.gamestate.main.id.set(this.cartridge.main.id);
    this.gamestate.main.name.set(this.cartridge.main.name);
    this.gamestate.main.code.set(this.cartridge.main.code);
    this.gamestate.main.view.set(
      new View({
        center: new GameLocation(this.cartridge.start.view.center[0], this.cartridge.start.view.center[1], 'EPSG:4326').getCoords(),
        zoom: this.cartridge.start.view.zoom
      })
    );
    this.gamestate.main.player.set(
      new GameLocation(this.cartridge.start.player[0], this.cartridge.start.player[1], 'EPSG:4326')
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
