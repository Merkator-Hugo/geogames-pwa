import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    public game: GameStateService,
    private cartRidge: CartridgeService,
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  loadGame(event: any) {
    event.stopPropagation();
    this.cartRidge.load();
    // this.game.run();
    this.modalController.dismiss();
  }

}
