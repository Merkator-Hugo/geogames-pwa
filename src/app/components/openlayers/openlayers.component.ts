import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { MapService } from 'src/app/services/map.service';

@Component({
	selector: 'app-openlayers',
	templateUrl: './openlayers.component.html',
	styleUrls: ['./openlayers.component.scss'],
})
export class OpenlayersComponent implements OnInit {

	map: Map;

	constructor(private mapService: MapService) {}

	ngOnInit() {
		this.map = this.mapService.map.create();
		this.mapService.player.add();
		this.mapService.zones.createLayer();
	}

}
