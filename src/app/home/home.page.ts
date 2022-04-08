import { Component, OnInit } from '@angular/core';
import { Directions } from '../model/utils/directions.enum';
import { LocationService } from '../services/location.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public location = '';
  public speed = 10;
  public demo = true;

  constructor(
    private locationService: LocationService,
    private mapService: MapService
    ) {}

  ngOnInit(){
    this.location = this.formatLocation(this.locationService.getCurrentLocation().getCoords());
  }

  move(event: any, direction: Directions) {
    event.stopPropagation();
    const newLocation = this.locationService.move(direction, this.speed);
    this.mapService.refreshPlayerLayer(newLocation);
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
