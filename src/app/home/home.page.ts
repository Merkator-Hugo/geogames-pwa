import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../components/menu/menu.component';
import { ZoneListComponent } from '../components/zone-list/zone-list.component';
import { GameAction } from '../model/actions/game-action';
import { ActionTypes } from '../model/utils/action-types.enum';
import { Directions } from '../model/utils/directions.enum';
import { EventTypes } from '../model/utils/event-types.enum';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { CartridgeService } from '../services/cartridge.service';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public location = '';
  public speed = 10;

  constructor(
    public game: GameStateService,
    private cartRidge: CartridgeService,
    public modalController: ModalController
    ) {}

  ngOnInit(){
    this.location = this.formatLocation(this.game.player.location().getCoords());
    this.setDemo();
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
      cssClass: 'modal-class'
    });
    return await modal.present();
  }

  async openPersonList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'modal-class'
    });
    return await modal.present();
  }

  async openToolList() {
    const modal = await this.modalController.create({
      component: ZoneListComponent,
      cssClass: 'modal-class'
    });
    return await modal.present();
  }

  move(event: any, direction: Directions) {
    event.stopPropagation();
    const newLocation = this.game.player.move(direction, this.speed);
    this.location = this.formatLocation(newLocation.getCoords());
  }

  setSpeed(event: any, direction: number) {
    event.stopPropagation();
    this.speed += 10 * direction;
    if (this.speed > 50) {
      this.speed = 50;
    }
    if (this.speed < 10) {
      this.speed = 10;
    }
  }

  private setDemo() {
    this.game.demo.set(true);
    this.cartRidge.load();
  }

  private formatLocation(location: number[]): string {
    return (location[0].toFixed(0) + '/' + location[1].toFixed(0));
  }

}
