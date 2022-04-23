import { transform } from 'ol/proj';
import { Directions } from './directions.enum';

export class GameLocation {
    private srid = 'EPSG:3857';
    private lon: number;
    private lat: number;

    constructor(lon: number, lat: number, srid?: string) {
        if (srid === null || srid === undefined) {
            this.lon = lon;
            this.lat = lat;
        } else {
            const coords = transform([lon, lat], srid, this.srid);
            this.lon = coords[0];
            this.lat = coords[1];
        }
    }

    getCoords(srid?: string): number[] {
        if (srid === null || srid === undefined) {
            return [this.lon, this.lat];
        } else {
            return transform([this.lon, this.lat], this.srid, srid);
        }
    }

    changeLat(speed: number) {
        this.lat += speed;
    }

    changeLon(speed: number) {
        this.lon += speed;
    }

    format(fixed: number): string {
        return (this.lon.toFixed(fixed) + '/' + this.lat.toFixed(fixed));
    }

}
