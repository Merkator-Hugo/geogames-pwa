import { Injectable } from '@angular/core';
import { GameAction } from '../model/actions/game-action';
import { ActionTypes } from '../model/utils/action-types.enum';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private utils: UtilsService) { }

  public startAction(action: GameAction) {
    switch(action.type) {
      case ActionTypes.aMessage:
        this.utils.toast.present(action.payload.message);
        break;
    }
  }
}
