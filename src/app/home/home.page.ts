import { Component, OnInit } from '@angular/core';
import { Directions } from '../model/utils/directions.enum';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public location = '';
  public speed = 10;
  public demo = true;

  constructor(private game: GameStateService) {}

  ngOnInit(){
    this.location = this.formatLocation(this.game.player.location().getCoords());
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
