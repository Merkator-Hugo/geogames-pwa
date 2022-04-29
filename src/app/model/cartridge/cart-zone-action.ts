import { EventTypes } from '../enums/event-types.enum';

export class CartZoneAction {
    private event: EventTypes;
    private ids: string;

    constructor(event: EventTypes, ids: string) {
        this.event = event;
        this.ids = ids;
    }

    getEvent(): EventTypes {
        return this.event;
    }
    getIds(): string {
        return this.ids;
    }
}
