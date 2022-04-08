import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Feature, Map } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { CardridgeService } from 'src/app/services/cardridge.service';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import { transform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { MapService } from 'src/app/services/map.service';

@Component({
	selector: 'app-openlayers',
	templateUrl: './openlayers.component.html',
	styleUrls: ['./openlayers.component.scss'],
})
export class OpenlayersComponent implements OnInit {

	map: Map;

	// private pointLayer;
	// private pointStyle = new Style({
	// 	image: new CircleStyle({
	// 		radius: 3,
	// 		fill: new Fill({
	// 			color: '#000',
	// 		}),
	// 	}),
	// });
	// private iconStyle = new Style({
	// 	image: new Icon({
	// 		anchor: [0.5, 46],
	// 		anchorXUnits: 'fraction',
	// 		anchorYUnits: 'pixels',
	// 		src: 'assets/data/person.png',
	// 		scale: 0.05
	// 	}),
	// });

	// constructor(public cartridge: CardridgeService) { }
	constructor(private mapService: MapService) {}

	ngOnInit() {
		this.map = this.mapService.createMap();
		// this.map = new Map({
		// 	layers: [
		// 		new TileLayer({
		// 			source: new OSM()
		// 		})],
		// 	target: document.getElementById('map'),
		// 	view: this.cartridge.get().settings.start.view
		// });
		// this.refreshPointsLayer([this.cartridge.get().settings.start.player]);
		// setTimeout(() => {
		// 	this.map.updateSize();
		// }, 500);
	}

	// public refreshPointsLayer(points: any[]) {
	// 	if (this.pointLayer !== undefined) {
	// 		this.map.removeLayer(this.pointLayer);
	// 	}
	// 	const fts: Feature<Geometry>[] = [];
	// 	points.forEach((p) => {
	// 		const feature = new Feature();
	// 		feature.setStyle(this.iconStyle);
	// 		feature.setGeometry(new Point(p));
	// 		fts.push(feature);
	// 	});
	// 	this.pointLayer = new VectorLayer({
	// 		zIndex: 11,
	// 		source: new VectorSource({
	// 			features: fts,
	// 		}),
	// 	});
	// 	this.map.addLayer(this.pointLayer);
	// }

}
