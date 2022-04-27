import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {

  constructor(
    public gamestate: GameStateService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
