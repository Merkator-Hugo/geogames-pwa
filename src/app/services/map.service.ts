import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { GameLocation } from '../model/utils/game-location';
import { CardridgeService } from './cardridge.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map;
  private playerLayer;
	private pointStyle = new Style({
		image: new CircleStyle({
			radius: 3,
			fill: new Fill({
				color: '#000',
			}),
		}),
	});
	private iconStyle = new Style({
		image: new Icon({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			src: 'assets/data/person.png',
			scale: 0.05
		}),
	});

	constructor(
    public locationService: LocationService) {}

	createMap(): Map {
		this.map = new Map({
			layers: [
				new TileLayer({
					source: new OSM()
				})],
			target: document.getElementById('map'),
			view: new View({
        center: this.locationService.getCurrentLocation().getCoords(),
        zoom: 14
      })
		});
		this.refreshPlayerLayer(this.locationService.getCurrentLocation());
		setTimeout(() => {
			this.map.updateSize();
		}, 500);
    return this.map;
	}

	public refreshPlayerLayer(point: GameLocation) {
		if (this.playerLayer !== undefined) {
			this.map.removeLayer(this.playerLayer);
		}
		const fts: Feature<Geometry>[] = [];
		const feature = new Feature();
		feature.setStyle(this.iconStyle);
		feature.setGeometry(new Point(point.getCoords()));
		fts.push(feature);
		this.playerLayer = new VectorLayer({
			zIndex: 11,
			source: new VectorSource({
				features: fts,
			}),
		});
		this.map.addLayer(this.playerLayer);
	}


}
