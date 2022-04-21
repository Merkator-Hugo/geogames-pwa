import { GameObject } from './game-object';

export class PersonObject extends GameObject {

    constructor(id: string, name: string, zone: string, isVisible: boolean, isActive: boolean){
        super(id, name, zone, isVisible, isActive);
    }

}
