import { GameAction } from './game-action';

export class GameActions {
    actions: GameAction[];

    constructor(){
        this.actions = [];
    }

    get(id: string): GameAction {
        return this.actions.find((a) => a.id = id);
    }

    add(action: GameAction) {
        this.actions.push(action);
    }

    remove(id: string) {
        const action = this.actions.find((a) => a.id = id);
        const idx = this.actions.indexOf(action);
        if (idx > -1) {
            this.actions.splice(idx, 1);
        }
    }
}
