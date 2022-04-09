import { GameAction } from '../actions/game-action';
import { GameActions } from '../actions/game-actions';
import { EventTypes } from '../utils/event-types.enum';

export class GameObject {
    id: string;
    zone: string;
    // actions: Map<EventTypes, GameAction[]> = new Map();
    actions: Map<EventTypes, GameActions[]> = new Map();

    constructor(id: string, zone: string){
        this.id = id;
        this.zone = zone;
    }

    // addAction(type: EventTypes, action: GameAction) {
    //     const typelist = this.actions.get(type);
    //     if (typelist !== null && typelist !== undefined) {
    //         typelist.push(action);
    //     } else {
    //         this.actions.set(type, [action]);
    //     }
    // }

    // getAction(eventType: EventTypes): GameAction {
    //     const actionList = this.actions.get(eventType);
    //     return (actionList !== null && actionList !== undefined) ? actionList[0] : null;
    // }

    addAction(type: EventTypes, actions: GameActions) {
        const typelist = this.actions.get(type);
        if (typelist !== null && typelist !== undefined) {
            typelist.push(actions);
        } else {
            this.actions.set(type, [actions]);
        }
    }

    getActions(eventType: EventTypes): GameActions {
        const actionList = this.actions.get(eventType);
        return (actionList !== null && actionList !== undefined) ? actionList[0] : null;
    }


}
