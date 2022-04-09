import { Component, OnInit } from '@angular/core';
import { GameAction } from '../model/actions/game-action';
import { ActionTypes } from '../model/utils/action-types.enum';
import { Directions } from '../model/utils/directions.enum';
import { EventTypes } from '../model/utils/event-types.enum';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public location = '';
  public speed = 10;
  // public zoneCount = 0;

  constructor(public game: GameStateService) {}

  ngOnInit(){
    this.location = this.formatLocation(this.game.player.location().getCoords());
    this.game.demo.set(true);
  }

  loadGame(event: any) {
    event.stopPropagation();
    const zones = [
      'POLYGON((5.646 51.7335, 5.647 51.7335, 5.647 51.734, 5.646 51.734, 5.646 51.7335))',
      'POLYGON((5.6465 51.7335, 5.6475 51.7335, 5.6475 51.734, 5.6465 51.734, 5.6465 51.7335))'
    ];
    this.game.zones.add(zones[0], '#0');
		this.game.zones.add(zones[1], '#1');
    const action = new GameAction('#a1', ActionTypes.aMessage, '', { message: 'you entered zone 1'});
    this.game.actions.add(ObjectTypes.eZone, '#0', EventTypes.eEnterZone, action);
  }

  move(event: any, direction: Directions) {
    event.stopPropagation();
    const newLocation = this.game.player.move(direction, this.speed);
    this.location = this.formatLocation(newLocation.getCoords());
  }

  setSpeed(event: any, direction: number) {
    event.stopPropagation();
    this.speed += 10 * direction;
    if (this.speed > 50) {
      this.speed = 50;
    }
    if (this.speed < 10) {
      this.speed = 10;
    }
  }

  private formatLocation(location: number[]): string {
    return (location[0].toFixed(0) + '/' + location[1].toFixed(0));
  }

}
