import View from 'ol/View';
import { GameLocation } from '../utils/game-location';
import { CartAction } from './cart-action';
import { CartStart } from './cart-start';
import { CartZone } from './cart-zone';
import { Editable } from './editable';

export class Cartridge extends Editable{

    public start = {
        view: {
            get: (): View => this.cartStart.view.get(),
            set: (view: View): void => {
                if (this.isSealed()) { return; };
                this.cartStart.view.set(view);
            }
        },
        player: {
            get: (): GameLocation => this.cartStart.player.get(),
            set: (point: GameLocation): void => {
                if (this.isSealed()) { return; };
                this.cartStart.player.set(point);
            }
        }
    };
    public zones = {
        get: (): CartZone[] => this.cartZones,
        set: (zones) => {
            if (this.isSealed()) { return; };
            this.cartZones = [];
            zones.forEach(zone => {
                this.cartZones.push(new CartZone(
                    zone.id,
                    zone.zone,
                    zone.name,
                    zone.isVisible,
                    zone.isActive,
                    zone.actions
                ));
            });
        },
        add: (zone: CartZone) => {
            if (this.isSealed()) { return; };
            this.cartZones.push(zone);
        }
    };
    public actions = {
        get: (): CartAction[] => this.cartActions,
        set: (actions) => {
            if (this.isSealed()) { return; };
            this.cartActions = [];
            actions.forEach(action => {
                this.cartActions.push(new CartAction(
                    action.id,
                    action.type,
                    action.name,
                    action.payload
                ));
            });
        }
    };

    private name: string;
    private cartStart: CartStart;
    private cartZones: CartZone[];
    private cartActions: CartAction[];

    constructor(name: string) {
        super();
        this.name = name;
        this.cartStart = new CartStart();
        this.cartZones = [];
    }

    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        if (this.isSealed()) { return; }
        this.name = name;
    }

}
