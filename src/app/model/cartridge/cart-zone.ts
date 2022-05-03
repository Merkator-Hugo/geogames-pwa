import { CartZoneAction } from './cart-zone-action';
import { appInjector } from '../../app.module';
import { UtilsService } from 'src/app/services/utils.service';

export class CartZone {

    public id = {
        get: (): string => this.zoneId,
        set: (id: string): string => this.zoneId = id
    };
    public zone = {
        get: (): string => this.zoneZone,
        set: (zone: string): string => this.zoneZone = zone
    };
    public name = {
        get: (): string => this.zoneName,
        set: (name: string): string => this.zoneName = name
    };
    public visibility = {
        get: (): boolean => this.zoneVisibility,
        set: (isVisible: boolean): boolean => this.zoneVisibility = isVisible
    };
    public activation = {
        get: (): boolean => this.zoneActivation,
        set: (isActive: boolean): boolean => this.zoneActivation = isActive
    };
    public actions = {
        get: (): CartZoneAction[] => this.zoneActions,
        set: (actions) => {
            actions.forEach((action) => {
                this.zoneActions.push(new CartZoneAction(action.event, action.ids));
            });
        }
    };

    private zoneId: string;
    private zoneZone: string;
    private zoneName: string;
    private zoneVisibility: boolean;
    private zoneActivation: boolean;
    private zoneActions: CartZoneAction[];

    private utils = appInjector.get(UtilsService);

    constructor() {
        this.zoneId = this.utils.uuid.generate();
        this.zoneZone = '';
        this.zoneName = '';
        this.zoneVisibility = false;
        this.zoneActivation = false;
        this.zoneActions = [];
    }
}
