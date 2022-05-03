import View from 'ol/View';
import { GameLocation } from '../utils/game-location';
import { CartAction } from './cart-action';
import { CartStart } from './cart-start';
import { CartZone } from './cart-zone';
import { CartMain } from './cart-main';

export class Cartridge{

    public main = {
        id: {
            get: (): string => this.cartMain.getId(),
            set: (id: string): void => this.cartMain.setId(id)
        },
        name: {
            get: (): string => this.cartMain.getName(),
            set: (name: string): void => this.cartMain.setName(name)
        },
        code: {
            get: (): string => this.cartMain.getCode(),
            set: (code: string): void => this.cartMain.setCode(code)
        },
        isSealed: (): boolean => this.cartMain.isSealed()
    };
    public start = {
        view: {
            get: (): View => this.cartStart.view.get(),
            set: (view: View): void => {
                if (this.main.isSealed()) { return; };
                this.cartStart.view.set(view);
            }
        },
        player: {
            get: (): GameLocation => this.cartStart.player.get(),
            set: (point: GameLocation): void => {
                if (this.main.isSealed()) { return; };
                this.cartStart.player.set(point);
            }
        }
    };
    public zones = {
        get: (): CartZone[] => this.cartZones,
        set: (zones) => {
            if (this.main.isSealed()) { return; };
            this.cartZones = [];
            zones.forEach(zone => {
                const newZone = new CartZone();
                newZone.id.set(zone.id);
                newZone.name.set(zone.name);
                newZone.zone.set(zone.zone);
                newZone.visibility.set(zone.isVisible);
                newZone.activation.set(zone.setActivation);
                newZone.actions.set(zone.actions);
                this.cartZones.push(newZone);
            });
        },
        add: (zone: CartZone) => {
            if (this.main.isSealed()) { return; };
            this.cartZones.push(zone);
        }
    };
    public actions = {
        get: (): CartAction[] => this.cartActions,
        set: (actions) => {
            if (this.main.isSealed()) { return; };
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

    private cartMain: CartMain;
    private cartStart: CartStart;
    private cartZones: CartZone[];
    private cartActions: CartAction[];

    constructor() {
        this.cartMain = new CartMain();
        this.cartStart = new CartStart();
        this.cartZones = [];
    }

}
