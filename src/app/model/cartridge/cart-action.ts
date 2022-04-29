import { ActionTypes } from '../enums/action-types.enum';

export class CartAction {
    private id: string;
    private type: ActionTypes;
    private name: string;
    private payload: any;

    constructor(id: string, type: ActionTypes, name: string, payload: any) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.payload = payload;
    }

    getId(): string {
        return this.id;
    }
    getType(): ActionTypes {
        return this.type;
    }
    getName(): string {
        return this.name;
    }
    getPayload(): any {
        return this.payload;
    }

}
