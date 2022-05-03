import View from 'ol/View';
import { UtilsService } from 'src/app/services/utils.service';
import { GameLocation } from '../utils/game-location';
import { appInjector } from '../../app.module';

export class MainObject {

    public id = {
        get: (): string => this.cartId,
        set: (id: string): string => this.cartId = id
    };
    public name = {
        get: (): string => this.cartName,
        set: (name: string): string => this.cartName = name
    };
    public code = {
        get: (): string => this.cartCode,
        set: (code: string): string => this.cartCode = code,
        isSealed: (): boolean => (this.cartCode !== null && this.cartCode !== undefined && this.cartCode !== '')
    };

    public view = {
        get: (): View => this.cartView,
        set: (view: View) => this.cartView = view,
    };

    public player = {
        get: (): GameLocation => this.cartPlayer,
        set: (player: GameLocation) => this.cartPlayer = player
    };

    private cartId: string;
    private cartName: string;
    private cartCode: string;
    private cartView: View;
    private cartPlayer: GameLocation;
    private utils = appInjector.get(UtilsService);

    constructor() {
        this.cartId = this.utils.uuid.generate();
        this.cartName = '';
        this.cartCode = '';
        this.cartView = new View({
            center: [0, 0],
            zoom: 16
        });
        this.cartPlayer = new GameLocation(0, 0);
    }

}
