import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZoneObject } from 'src/app/model/objects/zone-object';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent implements OnInit {

  public zones: ZoneObject[] = [];

  constructor(
    public game: GameStateService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.zones = this.game.zones.get();
    const x = 1;
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
