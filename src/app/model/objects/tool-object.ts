import { GameObject } from './game-object';

export class ToolObject extends GameObject {

    constructor(id: string, zone: string, isVisible: boolean, isActive: boolean){
        super(id, zone, isVisible, isActive);
    }

}
