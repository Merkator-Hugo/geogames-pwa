import { View } from 'ol';
import { GameLocation } from '../utils/game-location';

export class CartStart {
    view: View;
    player: GameLocation;

    constructor(view: View, player: GameLocation) {
        this.view = view;
        this.player = player;
    }
}
