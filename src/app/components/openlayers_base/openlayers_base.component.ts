import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Map } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';

@Component({
  selector: 'app-openlayers-base',
  templateUrl: './openlayers_base.component.html',
  styleUrls: ['./openlayers_base.component.scss'],
})
export class OpenlayersBaseComponent implements OnInit {

	map: Map;

  	constructor() { }

  	ngOnInit() {
  		this.map = new Map({
		  layers: [
		  	new TileLayer({
		  		source: new OSM()
		  	})],
		  target: document.getElementById('map'),
		  view: new View({
		    center: [0, 0],
		    zoom: 3
		  })
		});
		setTimeout(() => {
  	  	  this.map.updateSize();
  	  	}, 500);
  	}
}
