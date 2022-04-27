import { transform } from 'ol/proj';
import { Directions } from '../enums/directions.enum';

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

    setCoords(coords: number[], srid: string) {
        const transformed = transform(coords, srid, this.srid);
        this.lon = transformed[0];
        this.lat = transformed[1];
    }

    changeLat(speed: number) {
        this.lat += speed;
    }

    changeLon(speed: number) {
        this.lon += speed;
    }

    format(fixed: number): string {
        const latlon = this.getCoords('EPSG:4326');
        const lat = latlon[1];
        const lon = latlon[0];
        const latLabel = (lat > 0) ? 'N' : 'S';
        const lonLabel = (lon > 0) ? 'E' : 'W';
        return (latLabel + ' ' + lat.toFixed(fixed) + ' / ' +lonLabel + ' ' +  lon.toFixed(fixed));
    }

}
