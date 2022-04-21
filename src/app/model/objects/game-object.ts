import { GameAction } from '../actions/game-action';
import { GameActions } from '../actions/game-actions';
import { EventTypes } from '../utils/event-types.enum';

export class GameObject {
    id: string;
    name: string;
    wkt: string;
    isVisible: boolean;
    isActive: boolean;
    actions: Map<EventTypes, GameActions[]> = new Map();

    constructor(id: string, name: string, zone: string, isVisible: boolean, isActive: boolean){
        this.id = id;
        this.name = (name === null || name === undefined) ? '' : name;
        this.wkt = zone;
        this.isVisible = isVisible;
        this.isActive = isActive;
    }

    setVisibility(state: boolean) {
        this.isVisible = state;
    }

    setActivation(state: boolean) {
        this.isActive = state;
    }

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
