import { ActionTypes } from '../enums/action-types.enum';

export class GameAction {
    id: string;
    type: ActionTypes;
    name: string;
    payload: any;

    constructor(id: string, type: ActionTypes, name?: string, payload?: any){
        this.id = id;
        this.type = type;
        this.name = (name !== null && name !== undefined) ? name : '';
        this.payload = ((payload !== null && payload !== undefined) ? payload : {});
    }
}
