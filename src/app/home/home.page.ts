import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../components/menu/menu.component';
import { ZoneListComponent } from '../components/zone-list/zone-list.component';
import { Directions } from '../model/enums/directions.enum';
import { CartridgeService } from '../services/cartridge.service';
import { GameLoopService } from '../services/game-loop.service';
import { GameStateService } from '../services/game-state.service';
import { MapService } from '../services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { actionSheetController } from '@ionic/core';
import { NavigatorComponent } from '../components/navigator/navigator.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public speed = 10;
  public eDirections = Directions;

  private watch;

  constructor(
    public gamestate: GameStateService,
    public gameloop: GameLoopService,
    private cartRidge: CartridgeService,
    public modalController: ModalController,
    private mapService: MapService,
    ) {
      this.gamestate.modeChanged.subscribe((newMode) => {
        this.init();
      });
    }

  ngOnInit(){
    this.init();
  }

  public rot(){
    return 'rotate(270deg)';
  }

  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'modal-class'
    });
    return await modal.present();
  }

  async openZoneList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: '-list-modal-class'
    });
    return await modal.present();
  }

  async openPersonList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'list-modal-class'
    });
    return await modal.present();
  }

  async openToolList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'list-modal-class'
    });
    return await modal.present();
  }

  async openNavigator() {
    const modal = await this.modalController.create({
      component: NavigatorComponent,
      cssClass: 'navigator-modal-class'
    });
    return await modal.present();
  }

  public move(event: any, direction: Directions) {
    event.stopPropagation();
    const currentLocation = this.gamestate.player.location.get();
    switch(direction) {
      case Directions.eUp:
        currentLocation.changeLat(this.speed);
        break;
      case Directions.eDown:
        currentLocation.changeLat(-1 * this.speed);
        break;
      case Directions.eLeft:
        currentLocation.changeLon(-1 * this.speed);
        break;
      case Directions.eRight:
        currentLocation.changeLon(this.speed);
        break;
    }
    this.mapService.player.refresh(currentLocation);
    const view = this.mapService.view.get();
    view.setCenter(currentLocation.getCoords());
    this.mapService.view.refresh(view);
    this.gameloop.check();
  }

  public setSpeed(event: any, direction: number) {
    event.stopPropagation();
    this.speed += 10 * direction;
    if (this.speed > 50) {
      this.speed = 50;
    }
    if (this.speed < 10) {
      this.speed = 10;
    }
  }

  private init() {
    if (this.gamestate.gameMode.isDemo()) {
      this.cartRidge.load();
      this.watch.unsubscribe();
    } else if (this.gamestate.gameMode.isPlay()) {
      this.cartRidge.clear();
      this.watch = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (data) => {
          const currentLocation = this.gamestate.player.location.get();
          currentLocation.setCoords([data.coords.longitude,data.coords.latitude], 'EPSG:4326');
          this.mapService.player.refresh(currentLocation);
          const view = this.mapService.view.get();
          view.setCenter(currentLocation.getCoords());
          this.mapService.view.refresh(view);
          this.gameloop.check();
        }
      );
    }
  }
}
