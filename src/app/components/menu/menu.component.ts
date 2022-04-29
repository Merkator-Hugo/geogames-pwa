import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  private lastSegment: GameModes;

  constructor(
    public gamestate: GameStateService,
    private cartRidge: CartridgeService,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.gameModes = this.gamestate.gameMode.getAll();
    this.currentSegment = this.gamestate.gameMode.current();
    this.lastSegment = this.currentSegment;
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
    console.log(event);
    const value = event.detail.value;
    if(Object.values(GameModes).includes(value)) {
      if (value === GameModes.eEdit) {
        this.presentAlertConfirm('', 'By switching to Edit-mode, you will loose all game-progress!').then(
          (result) => {
            if (result.role === 'OK') {
              this.lastSegment = this.currentSegment;
              this.gamestate.gameMode.set(this.currentSegment);
              this.modalController.dismiss();
            } else {
              this.currentSegment = this.lastSegment;
            }
          }
        );
      } else {
        this.lastSegment = this.currentSegment;
        this.gamestate.gameMode.set(this.currentSegment);
        this.modalController.dismiss();
      }
    }
  }

  toggleShowLocation($event) {
    this.gamestate.gui.showLocation.toggle();
    this.modalController.dismiss();
  }

  private async presentAlertConfirm(subheader: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: 'Are you sure ?',
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {}
        }, {
          text: 'Ok',
          role: 'OK',
          id: 'confirm-button',
          handler: () => {
            alert.dismiss('OK');
          }
        }
      ]
    });
    await alert.present();
    return await alert.onDidDismiss().then((data) => data);
  }

}
