import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModes } from 'src/app/model/enums/game-modes.enum';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public gameModes: GameModes[];
  public currentSegment: GameModes;

  constructor(
    public gamestate: GameStateService,
    private cartRidge: CartridgeService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.gameModes = this.gamestate.gameMode.getAll();
    this.currentSegment = this.gamestate.gameMode.current();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  loadGame(event: any) {
    event.stopPropagation();
    this.cartRidge.load();
    this.modalController.dismiss();
  }

  segmentChanged(event){
    // console.log(event);
    const value = event.detail.value;
    if(Object.values(GameModes).includes(value)) {
      this.currentSegment = value;
      this.gamestate.gameMode.set(this.currentSegment);
    }
  }

  toggleShowLocation($event) {
    this.gamestate.gui.showLocation.toggle();
  }

}
