import { Component, OnInit } from '@angular/core';
import { GameAction } from '../model/actions/game-action';
import { ActionTypes } from '../model/utils/action-types.enum';
import { Directions } from '../model/utils/directions.enum';
import { EventTypes } from '../model/utils/event-types.enum';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { CartridgeService } from '../services/cartridge.service';
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

  constructor(
    public game: GameStateService,
    private cartRidge: CartridgeService
    ) {}

  ngOnInit(){
    this.location = this.formatLocation(this.game.player.location().getCoords());
    this.game.demo.set(true);
  }

  loadGame(event: any) {
    event.stopPropagation();
    this.cartRidge.load();
    this.game.run();
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
