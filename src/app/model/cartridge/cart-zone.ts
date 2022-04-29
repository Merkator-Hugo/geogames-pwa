import { CartZoneAction } from './cart-zone-action';

export class CartZone {
    private id: string;
    private zone: string;
    private name: string;
    private visible: boolean;
    private active: boolean;
    private actions: CartZoneAction[];

    constructor(
        id: string,
        zone: string,
        name: string,
        isVisible: boolean,
        isActive: boolean,
        actions: any[]
    ) {
        this.id = id;
        this.zone = zone;
        this.name = name;
        this.visible = isVisible;
        this.active = isActive;
        this.actions = [];
        actions.forEach((action) => {
            this.actions.push(new CartZoneAction(action.event, action.ids));
        });
    }

    getId(): string {
        return this.id;
    }
    getZone(): string {
        return this.zone;
    }
    getName(): string {
        return this.name;
    }
    isVisible(): boolean {
        return this.visible;
    }
    isActive(): boolean {
        return this.active;
    }
    getActions(): CartZoneAction[] {
        return this.actions;
    }

}
