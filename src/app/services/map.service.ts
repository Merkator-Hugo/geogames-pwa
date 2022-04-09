import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import { Polygon } from 'ol/geom';
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
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { GameLocation } from '../model/utils/game-location';
import { LocationService } from './location.service';
import WKT from 'ol/format/WKT';
import { ObjectRef } from '../model/objects/object-ref';

@Injectable({
	providedIn: 'root'
})
export class MapService {

	public map = {
		create: (): Map => {
			this.currentMap = new Map({
				layers: [
					new TileLayer({
						source: new OSM()
					})],
				target: document.getElementById('map'),
				view: new View({
					center: this.locationService.getCurrentLocation().getCoords(),
					zoom: 18
				})
			});
			this.currentMap.on('click', (event) => {
				alert(event.coordinate);
			});
			setTimeout(() => {
				this.currentMap.updateSize();
			}, 500);
			return this.currentMap;
		}
	};
	public view = {
		refresh: (point: GameLocation): void => this.currentMap.getView().setCenter(point.getCoords())
	};
	public player = {
		add: (): void => this.player.refresh(this.locationService.getCurrentLocation()),
		refresh: (point: GameLocation): void => {
			if (this.playerLayer !== undefined) {
				this.currentMap.removeLayer(this.playerLayer);
			}
			const fts: Feature<Geometry>[] = [];
			const feature = new Feature();
			feature.setStyle([this.iconStyle, this.pointStyle]);
			feature.setGeometry(new Point(point.getCoords()));
			fts.push(feature);
			this.playerLayer = new VectorLayer({
				zIndex: 12,
				source: new VectorSource({
					features: fts,
				}),
			});
			this.currentMap.addLayer(this.playerLayer);
		}
	};
	public zones = {
		createLayer: (): void => {
			if (this.zonesLayer !== undefined) {
				this.currentMap.removeLayer(this.zonesLayer);
			}
			const fts: Feature<Geometry>[] = [];
			this.zonesLayer = new VectorLayer({
				zIndex: 11,
				source: new VectorSource({
					features: fts,
				}),
			});
			this.currentMap.addLayer(this.zonesLayer);
		},
		add: (wkt: string, id: string): void => {
			const format = new WKT();
			const feature = format.readFeature(wkt, {
  				dataProjection: 'EPSG:4326',
  				featureProjection: 'EPSG:3857',
			});
			feature.setProperties({
				type: 'zone',
				id
			});
			// feature.setStyle([this.zoneStyle]);
			this.zonesLayer.getSource().addFeature(feature);
		},
		remove: (): void => {},
		check: (point: GameLocation): ObjectRef[] => {
			const pixel = this.currentMap.getPixelFromCoordinate(this.locationService.getCurrentLocation().getCoords());
			const zones = [];
			this.currentMap.forEachFeatureAtPixel(
				pixel,
				(feature) => {
					zones.push(new ObjectRef(feature.get('id'), feature.get('type')));
					return false;
				},
				{
					layerFilter: (layer) => layer === this.zonesLayer
				}
			);
			return zones;
		}
	};

	private currentMap: Map;
	private playerLayer;
	private zonesLayer;
	private pointStyle = new Style({
		image: new CircleStyle({
			radius: 5,
			fill: new Fill({
				color: '#000',
			}),
		}),
	});
	private iconStyle = new Style({
		image: new Icon({
			anchor: [0.5, 1470],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			src: 'assets/data/person.png',
			scale: 0.05
		}),
	});
	private zoneStyle = new Style({
		stroke: new Stroke({
			color: '#000',
		}),
		fill: new Fill({
			color: '#000',
		}),
	});

	constructor(private locationService: LocationService) { }

}
