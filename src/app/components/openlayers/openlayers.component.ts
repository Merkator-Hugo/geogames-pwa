import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { GameStateService } from 'src/app/services/game-state.service';
import { MapService } from 'src/app/services/map.service';

@Component({
	selector: 'app-openlayers',
	templateUrl: './openlayers.component.html',
	styleUrls: ['./openlayers.component.scss'],
})
export class OpenlayersComponent implements OnInit {

	map: Map;

	constructor(
		private mapService: MapService,
		private game: GameStateService) {}

	ngOnInit() {
		this.map = this.mapService.map.create();
	}

}
