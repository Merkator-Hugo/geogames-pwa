import { View } from 'ol';
import { GameLocation } from '../utils/game-location';

export class CartStart {

    public view = {
        get: (): View => this.cartView,
        set: (view: View) => this.cartView = view,
    };

    public player = {
        get: (): GameLocation => this.cartPlayer,
        set: (player: GameLocation) => this.cartPlayer = player
    };

    private cartView: View;
    private cartPlayer: GameLocation;

    constructor(){
        this.cartView = new View({
            center: [0,0],
            zoom: 16
        });
        this.cartPlayer = new GameLocation(0,0);
    }

}
