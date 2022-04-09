import { Injectable } from '@angular/core';
import { GameAction } from '../model/actions/game-action';
import { GameActions } from '../model/actions/game-actions';
import { ActionTypes } from '../model/utils/action-types.enum';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private utils: UtilsService) { }

  // public startAction(action: GameAction) {
  //   switch(action.type) {
  //     case ActionTypes.aMessage:
  //       this.utils.toast.present(action.payload.message);
  //       break;
  //   }
  // }

  public startActions(actions: GameActions) {
    actions.actions.forEach(action => {
      switch(action.type) {
        case ActionTypes.aMessage:
          this.utils.toast.present(action.payload.message);
          break;
      }
    });
  }

}
