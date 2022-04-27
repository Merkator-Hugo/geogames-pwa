import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZoneObject } from 'src/app/model/objects/zone-object';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { GameStateService } from 'src/app/services/game-state.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent implements OnInit {

  public zones: ZoneObject[] = [];
  public show: boolean[];

  constructor(
    public game: GameStateService,
    public map: MapService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.zones = this.game.zones.get();
    this.show = [];
    this.zones.forEach((z) => {
      this.show.push(false);
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  navigateTo(event, zone) {
    this.game.player.navigateTo.clear();
    const point = this.map.zones.getCenter(zone);
    this.game.player.navigateTo.set(point);
    this.game.player.navigateTo.directions();
    this.modalController.dismiss();
  }

}
