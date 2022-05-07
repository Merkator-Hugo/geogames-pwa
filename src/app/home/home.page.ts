import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../components/menu/menu.component';
import { ZoneListComponent } from '../components/zone-list/zone-list.component';
import { Directions } from '../model/enums/directions.enum';
import { CartridgeService } from '../services/cartridge.service';
import { GameLoopService } from '../services/game-loop.service';
import { GameStateService } from '../services/game-state.service';
import { Geolocation } from '@capacitor/geolocation';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { EditService } from '../services/edit.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {


  public speed = 10;
  public eDirections = Directions;

  private watch;
  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;

  constructor(
    public gamestate: GameStateService,
    public gameloop: GameLoopService,
    private cartRidge: CartridgeService,
    public editService: EditService,
    public modalController: ModalController,
  ) {
    this.gamestate.modeChanged.subscribe((newMode) => {
      this.init();
    });
  }

  ngOnInit() {
    this.init();
    this.gamestate.gui.screenWidth.set(window.innerWidth);
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(1000)).subscribe( evt => {
      const event = evt.target as Window;
      this.gamestate.gui.screenWidth.set(event.innerWidth);
      console.log('screenWidth changed to: ' + this.gamestate.gui.screenWidth.get());
    });
  }

  ngOnDestroy() {
    if (this.watch !== null && this.watch !== undefined) {
      Geolocation.clearWatch(this.watch);
    }
    this.resizeSubscription$.unsubscribe();
  }

  public rot() {
    return 'rotate(270deg)';
  }

  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'full-modal-class'
    });
    return await modal.present();
  }

  async openZoneList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'full-modal-class'
    });
    return await modal.present();
  }

  async openPersonList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'full-modal-class'
    });
    return await modal.present();
  }

  async openToolList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'full-modal-class'
    });
    return await modal.present();
  }

  async openNavigator() {
    const modal = await this.modalController.create({
      component: NavigatorComponent,
      backdropDismiss: false,
      cssClass: 'navigator-modal-class'
    });
    return await modal.present();
  }

  public move(event: any, direction: Directions) {
    event.stopPropagation();
    const currentLocation = this.gamestate.player.location.get();
    switch (direction) {
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
    this.gamestate.player.location.set(currentLocation);
    this.gameloop.move();
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
    if (this.watch !== null && this.watch !== undefined) {
      Geolocation.clearWatch(this.watch);
    }
    if (this.gamestate.gameMode.isHome()) {
      this.cartRidge.clear();
      this.gamestate.gui.map.setImage();
    } else if (this.gamestate.gameMode.isDemo()) {
      this.cartRidge.clear();
      this.cartRidge.load('demo');
      this.cartRidge.loaded.subscribe(() => {
        this.cartRidge.activate();
      });
      this.cartRidge.activated.subscribe(() => {
        this.gamestate.gui.map.setOffline();
        this.gamestate.run();
      });
    } else if (this.gamestate.gameMode.isPlay()) {
      this.cartRidge.clear();
      this.cartRidge.load();
      this.cartRidge.loaded.subscribe(() => {
        this.cartRidge.activate();
      });
      this.cartRidge.activated.subscribe(() => {
        this.gamestate.gui.map.setOffline();
        this.gamestate.run();
      });
      this.watch = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (data) => {
          const currentLocation = this.gamestate.player.location.get();
          currentLocation.setCoords([data.coords.longitude, data.coords.latitude], 'EPSG:4326');
          this.gamestate.player.location.set(currentLocation);
          this.gameloop.move();
        }
      );
    } else if (this.gamestate.gameMode.isEdit()) {
      this.cartRidge.clear();
      this.cartRidge.load();
      this.cartRidge.loaded.subscribe(() => {
        this.editService.cartridge.load();
      });
    }
  }

}

