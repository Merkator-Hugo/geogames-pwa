import { EventTypes } from '../utils/event-types.enum';

export class GameObject {
    id: string;
    name: string;
    wkt: string;
    isVisible: boolean;
    isActive: boolean;
    actions: Map<EventTypes, string> = new Map();

    constructor(id: string, name: string, zone: string, isVisible: boolean, isActive: boolean){
        this.id = id;
        this.name = (name === null || name === undefined) ? '' : name;
        this.wkt = zone;
        this.isVisible = isVisible;
        this.isActive = isActive;
    }

    setVisibility(state: boolean) {
        this.isVisible = state;
    }

    setActivation(state: boolean) {
        this.isActive = state;
    }

    addActions(type: EventTypes, actionIds: string) {
        let typelist: string = this.actions.get(type);
        if (typelist !== null && typelist !== undefined) {
            typelist = typelist + ';' + actionIds;
        } else {
            this.actions.set(type, actionIds);
        }
    }

    getActions(eventType: EventTypes): string {
        const actionList = this.actions.get(eventType);
        return (actionList !== null && actionList !== undefined) ? actionList : null;
    }


}
