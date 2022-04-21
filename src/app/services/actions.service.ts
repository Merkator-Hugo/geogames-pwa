import { Injectable } from '@angular/core';
import { GameActions } from '../model/actions/game-actions';
import { ActionTypes } from '../model/utils/action-types.enum';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from './game-state.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private utils: UtilsService,
    private gamestate: GameStateService
  ) { }

  public start(actions: GameActions) {
    if (actions === null) {
      this.utils.log.add('No actions found');
    } else {
      this.handleActions(actions);
    }
  }

  private handleActions(actions) {
    actions.actions.forEach(action => {
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
        }
    });
  }


}
