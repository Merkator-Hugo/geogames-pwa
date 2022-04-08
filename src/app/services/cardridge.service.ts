import { Injectable } from '@angular/core';
import { View } from 'ol';
import { transform } from 'ol/proj';
import { Cartridge } from '../model/cardridge';
import { Settings } from '../model/Settings';
import { Start } from '../model/start';
import { GameLocation } from '../model/utils/game-location';

@Injectable({
  providedIn: 'root'
})
export class CardridgeService {

  private cartridge: Cartridge;
  private thuis = { lon: 5.6464749, lat: 51.7330457, srid: 'EPSG:4326' };
  private mapSrid = 'EPSG:3857';

  constructor() {
    this.cartridge = this.loadCartridge();

  }

  public get(): Cartridge {
    return this.cartridge;
  }

  public getStartLocation(): GameLocation {
    return new GameLocation(this.thuis.lon, this.thuis.lat, this.thuis.srid);
  }

  private loadCartridge(): Cartridge {
    const cartridge: Cartridge = new Cartridge();
    cartridge.settings = new Settings();
    cartridge.settings.start = new Start();
    cartridge.settings.start.view = new View({
      center: transform([this.thuis.lon, this.thuis.lat], this.thuis.srid, this.mapSrid),
      zoom: 14
    });
    const location = transform([this.thuis.lon, this.thuis.lat], this.thuis.srid, this.mapSrid);
    cartridge.settings.start.player = location;
    return cartridge;
  }
}
