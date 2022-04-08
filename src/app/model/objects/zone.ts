import { GameObject } from './game-object';

export class Zone implements GameObject {
    id: string;
    zone: string;
    zoneOnEnter() {
        throw new Error('Method not implemented.');
    }
    zoneOnLeave() {
        throw new Error('Method not implemented.');
    }
    zoneOnStay() {
        throw new Error('Method not implemented.');
    }
}