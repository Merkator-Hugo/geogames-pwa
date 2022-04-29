import { Injectable } from '@angular/core';
import { View } from 'ol';
import { CartAction } from '../model/cartridge/cart-action';
import { CartZone } from '../model/cartridge/cart-zone';
import { Cartridge } from '../model/cartridge/cartridge';
import { GameLocation } from '../model/utils/game-location';
import { CartridgeService } from './cartridge.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public cartridge = {
    create: (name: string): Cartridge => this.currentCartridge = new Cartridge(name),
    load: () => {
      this.cartridgeService.load();
      const cartridgeFile = this.cartridgeService.get();
      this.currentCartridge = this.cartridge.create(cartridgeFile.name);
      this.currentCartridge.start.view.set(cartridgeFile.start.view);
      this.currentCartridge.start.player.set(cartridgeFile.start.player);
      this.currentCartridge.zones.set(cartridgeFile.zones);
      this.currentCartridge.actions.set(cartridgeFile.actions);
      const x = 1;
    },
    save: () => {},
    rename: (name: string): void => this.currentCartridge.setName(name),
    get: (): Cartridge => this.currentCartridge
  };
  public start = {
    setView: (view: View): void => this.currentCartridge.start.view.set(view),
    setPlayer: (location: GameLocation): void => this.currentCartridge.start.player.set(location)
  };
  public zones = {
    count: (): number => this.currentCartridge.zones.get().length,
    get: (): CartZone[] => this.currentCartridge.zones.get(),
    set: (zones) => this.currentCartridge.zones.set(zones),
    addNew: () => {
      this.currentCartridge.zones.add(
        new CartZone('#zoneNew', '', '', false, false, [])
      );
    }
  };
  public actions = {
    count: (): number => this.currentCartridge.actions.get().length,
    get: (): CartAction[] => this.currentCartridge.actions.get(),
    set: (actions) => this.currentCartridge.actions.set(actions)
  };

  private currentCartridge: Cartridge;

  constructor(
    private cartridgeService: CartridgeService
  ) {}

}
