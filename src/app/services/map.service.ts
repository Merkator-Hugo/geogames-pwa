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
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { GameLocation } from '../model/utils/game-location';
import { LocationService } from './location.service';
import WKT from 'ol/format/WKT';
import { ObjectRef } from '../model/objects/object-ref';
import { ZoneObject } from '../model/objects/zone-object';
import { Projection } from 'ol/proj';

@Injectable({
	providedIn: 'root'
})
export class MapService {

	public map = {
		create: (): Map => {
			const center = new GameLocation(5.387307113186567, 52.15528108667735, 'EPSG:4326');
			this.currentMap = new Map({
				layers: [
					new TileLayer({
						source: new OSM()
					})],
				target: document.getElementById('map'),
				view: new View({
					center: center.getCoords(),
					zoom: 12
				})
			});
			this.currentMap.on('click', (event) => {
				// alert(event.coordinate);
			});
			this.zones.createLayer();
			setTimeout(() => {
				this.currentMap.updateSize();
			}, 500);
			return this.currentMap;
		}
	};
	public view = {
		get: (): View => this.currentMap.getView(),
		refresh: (view: View): void => {
			this.currentMap.setView(view);
		}
	};
	public player = {
		add: (point: GameLocation): void => this.player.refresh(point),
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
				style: (feature) => {
					const visible = feature.get('visible');
					const active = feature.get('active');
					return visible
						? active ? this.activeZoneStyle : this.inactiveZoneStyle
						: null;
				  }
			});
			this.currentMap.addLayer(this.zonesLayer);
		},
		add: (zone: ZoneObject): void => {
			const format = new WKT();
			const feature = format.readFeature(zone.wkt, {
  				dataProjection: 'EPSG:4326',
  				featureProjection: 'EPSG:3857',
			});
			feature.setProperties({
				type: 'zone',
				visible: zone.isVisible,
				active: zone.isActive,
				id: zone.id
			});
			this.zonesLayer.getSource().addFeature(feature);
		},
		get: (zone): Feature => {
			const source = this.zonesLayer.getSource();
			const features = source.getFeatures();
			let retVal = null;
			features.forEach((feature) => {
				if (feature.get('id') === zone.id) {
					retVal = feature;
				}
			});
			return retVal;
		},
		remove: (): void => {
			// this.zonesLayer.getSource();
		},
		setVisibility: (zone, isVisible): void => {
			const source = this.zonesLayer.getSource();
			const features = source.getFeatures();
			features.forEach((feature) => {
				if (feature.get('id') === zone.id) {
					feature.set('visible', isVisible);
				}
			});
			const x = 1;
		},
		setActivation: (zone, isActive): void => {
			const source = this.zonesLayer.getSource();
			const features = source.getFeatures();
			features.forEach((feature) => {
				if (feature.get('id') === zone.id) {
					feature.set('active', isActive);
				}
			});
			const x = 1;
		},
		check: (point: GameLocation): ObjectRef[] => {
			const pixel = this.currentMap.getPixelFromCoordinate(this.locationService.getCurrentLocation().getCoords());
			const zones = [];
			this.currentMap.forEachFeatureAtPixel(
				pixel,
				(feature) => {
					if (feature.get('active')) {
						zones.push(new ObjectRef(feature.get('id'), feature.get('type')));
						return false;
					}
				},
				{
					layerFilter: (layer) => layer === this.zonesLayer
				}
			);
			return zones;
		},
		getCenter: (zone): GameLocation => {
			const feature = this.zones.get(zone);
			const extent = feature.getGeometry().getExtent();
			const x = (extent[0]+extent[2])/2;
			const y = (extent[1]+extent[3])/2;
			return new GameLocation(x,y);
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
	private activeZoneStyle = new Style({
		stroke: new Stroke({
			color: '#3399CC',
			width: 1.25,
		}),
		fill: new Fill({
			color: 'rgba(255,255,255,0.4)',
		}),
	});
	private inactiveZoneStyle = new Style({
		stroke: new Stroke({
			color: '#FF0000',
			width: 1.25,
		}),
		fill: new Fill({
			color: 'rgba(255,200,200,0.4)',
		}),
	});

	constructor(private locationService: LocationService) { }

}
