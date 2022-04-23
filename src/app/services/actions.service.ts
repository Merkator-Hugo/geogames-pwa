import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GameAction } from '../model/actions/game-action';
import { ActionTypes } from '../model/utils/action-types.enum';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from './game-state.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private actions: Map<string, GameAction> = new Map();

  constructor(
    private utils: UtilsService,
    private gamestate: GameStateService,
    public alertController: AlertController
  ) { }

  public set(id: string, action: GameAction) {
    this.actions.set(id, action);
  }

  public start(actionIds: string) {
    if (actionIds === null) {
      this.utils.log.add('No actions found');
    } else {
      this.handleActions(actionIds);
    }
  }

  private handleActions(actionIds: string) {
    actionIds.split(';').forEach(actionId => {
      const action = this.actions.get(actionId);
      switch(action.type) {
        case ActionTypes.eMessage:
          this.utils.toast.present(action.payload.message);
          break;
        case ActionTypes.eActivation:
          switch(action.payload.type) {
            case ObjectTypes.eZone:
              this.gamestate.zones.setActivation(action.payload.id, action.payload.state);
              break;
          }
          break;
        case ActionTypes.eVisibility:
          switch(action.payload.type) {
            case ObjectTypes.eZone:
              this.gamestate.zones.setVisibility(action.payload.id, action.payload.state);
              break;
          }
          break;
        case ActionTypes.eQuestion:
          this.presentQuestion(action.payload.question, action.payload.answer).then(
            (result) => {
              if (result === true) {
                this.start(action.payload.actions[0]);
              } else {
                this.start(action.payload.actions[1]);
              }
          });
          break;
        }
    });
  }

  private async presentQuestion(question: string, answer: string): Promise<boolean> {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: question,
      inputs: [
        {
          name: 'answer',
          type: 'text',
          placeholder: 'type your answer here'
        }
      ],
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
            alert.dismiss(data.answer);
          }
        }
      ]
    });

    await alert.present();

    return await alert.onDidDismiss().then((data) => answer.includes(data.data.values.answer));
  }


}
