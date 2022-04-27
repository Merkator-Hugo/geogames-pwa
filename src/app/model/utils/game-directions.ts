export class GameDirections {
    public distance: number;
    public bearing: number;
    constructor(distance: number, bearing: number) {
        this.distance = distance;
        this.bearing = bearing;
    }
    public formatDistance(fixed: number): string {
        return this.distance.toFixed(fixed);
    }
    public formatBearing(fixed: number): string {
        return this.bearing.toFixed(fixed);
    }
}