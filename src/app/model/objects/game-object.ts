export interface GameObject {
    id: string;
    zone: string;
    zoneOnEnter();
    zoneOnLeave();
    zoneOnStay();
}
