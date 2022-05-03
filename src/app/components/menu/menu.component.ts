import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GameModes } from 'src/app/model/enums/game-modes.enum';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { EditService } from 'src/app/services/edit.service';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public gameModes: GameModes[];
  public currentSegment: GameModes;
  public games: { id: string, name: string }[] = [];
  private lastSegment: GameModes;

  constructor(
    public gamestate: GameStateService,
    private cartRidge: CartridgeService,
    private editService: EditService,
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

  async loadGame(event: any) {
    event.stopPropagation();
    const result = await this.cartRidge.local.list();
    this.games = [];
    result.keys.forEach((key) => this.games.push({ id: key.split('@')[0], name: key.split('@')[1] }));
    this.presentAlertSelect(this.games).then((selection) => {
      this.cartRidge.local.load(selection.data.values.id + '@' + selection.data.values.name);
      this.modalController.dismiss();
    });
  }

  segmentChanged(event){
    console.log(event);
    const value = event.detail.value;
    if(Object.values(GameModes).includes(value)) {
      if (value === GameModes.eEdit) {
        if (!this.gamestate.gameMode.isEditable()) {
          this.presentAlertConfirm('Not allowed !', 'The current cartridge is not editable.');
        } else {
          this.presentAlertConfirm('Are you sure ?', 'By switching to Edit-mode, you will loose all game-progress!').then(
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
        }
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

  private async presentAlertConfirm(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header,
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

  private async presentAlertSelect(games: { id: string; name: string }[]) {
    const inputs = [];
    games.forEach((game) => {
      inputs.push(
        {
          name: game.name,
          type: 'radio',
          label: game.name,
          value: game,
          handler: () => {
            // console.log('Radio 1 selected');
          }
        }
      );
    });
    inputs[0].checked = true;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select',
      inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            alert.dismiss('OK');
          }
        }
      ]
    });
    await alert.present();
    return await alert.onDidDismiss().then((data) => data);
  }

}
