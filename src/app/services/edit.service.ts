import { Injectable } from '@angular/core';
import { View } from 'ol';
import { CartAction } from '../model/cartridge/cart-action';
import { CartZone } from '../model/cartridge/cart-zone';
import { Cartridge } from '../model/cartridge/cartridge';
import { ObjectTypes } from '../model/enums/object-types.enum';
import { GameLocation } from '../model/utils/game-location';
import { CartridgeService } from './cartridge.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public current = {
    object: {
      clear: (): void => this.currentObject = null,
      set: (object: ObjectTypes): ObjectTypes => this.currentObject = object,
      get: (): ObjectTypes => this.currentObject,
      isZone: (): boolean => this.currentObject === ObjectTypes.eZone
    },
    zone: {
      clear: (): void => this.currentZone = null,
      set: (zone: CartZone): CartZone => this.currentZone = zone,
      get: (): CartZone => this.currentZone
    }
  };
  public cartridge = {
    create: (): Cartridge => this.currentCartridge = new Cartridge(),
    load: () => {
      const cartridgeFile = this.cartridgeService.get();
      this.currentCartridge = this.cartridge.create();
      this.currentCartridge.main.id.set(cartridgeFile.main.id);
      this.currentCartridge.main.name.set(cartridgeFile.main.name);
      this.currentCartridge.main.code.set(cartridgeFile.main.code);
      this.currentCartridge.start.view.set(cartridgeFile.start.view);
      this.currentCartridge.start.player.set(cartridgeFile.start.player);
      this.currentCartridge.zones.set(cartridgeFile.zones);
      this.currentCartridge.actions.set(cartridgeFile.actions);
    },
    save: () => this.cartridgeService.save(this.currentCartridge),
    rename: (name: string): void => this.currentCartridge.main.name.set(name),
    get: (): Cartridge => this.currentCartridge,
    isEditable: (): boolean => !this.currentCartridge.main.isSealed()
  };
  public start = {
    setView: (view: View): void => this.currentCartridge.start.view.set(view),
    setPlayer: (location: GameLocation): void => this.currentCartridge.start.player.set(location)
  };
  public zones = {
    count: (): number => this.currentCartridge.zones.get().length,
    get: (): CartZone[] => this.currentCartridge.zones.get(),
    set: (zones) => this.currentCartridge.zones.set(zones),
    addNew: () => this.currentCartridge.zones.add(new CartZone())
  };
  public actions = {
    count: (): number => this.currentCartridge.actions.get().length,
    get: (): CartAction[] => this.currentCartridge.actions.get(),
    set: (actions) => this.currentCartridge.actions.set(actions)
  };

  private currentCartridge: Cartridge;
  private currentObject: ObjectTypes = null;
  private currentZone: CartZone = null;

  constructor(
    private cartridgeService: CartridgeService,
    private utils: UtilsService
  ) {}

}
