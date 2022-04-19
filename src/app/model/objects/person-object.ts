import { GameObject } from './game-object';

export class PersonObject extends GameObject {

    constructor(id: string, zone: string, isVisible: boolean, isActive: boolean){
        super(id, zone, isVisible, isActive);
    }

}
