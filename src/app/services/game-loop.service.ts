import { Injectable } from '@angular/core';
import { EventTypes } from '../model/enums/event-types.enum';
import { ObjectTypes } from '../model/enums/object-types.enum';
import { ActionsService } from './actions.service';
import { GameStateService } from './game-state.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {

  constructor(
    private gamestate: GameStateService,
    private mapService: MapService,
    private actions: ActionsService
  ) { }

  public check() {
    const oldCheckedZones = this.gamestate.zones.checked.get().map(e => ({ ... e }));
    const newCheckedZones = this.mapService.zones.check(this.gamestate.player.location.get());
    const stayedZones = newCheckedZones.filter(value => oldCheckedZones.some(value2 => value2.id === value.id));
    stayedZones.forEach((zone) => {
      switch(zone.type) {
        case ObjectTypes.eZone:
          const object = this.gamestate.zones.get().find((z) => z.id === zone.id);
          const actions = object.getActions(EventTypes.eStayInZone);
          this.actions.start(actions);
          break;
      }
    });
    const enteredZones = newCheckedZones.filter(value => !oldCheckedZones.some(value2 => value2.id === value.id));
    enteredZones.forEach((zone) => {
      switch(zone.type) {
        case ObjectTypes.eZone:
          const object = this.gamestate.zones.get().find((z) => z.id === zone.id);
          const actions = object.getActions(EventTypes.eEnterZone);
          this.actions.start(actions);
          break;
      }
    });
    const leftZones = oldCheckedZones.filter(value => !newCheckedZones.some(value2 => value2.id === value.id));
    leftZones.forEach((zone) => {
      switch(zone.type) {
        case ObjectTypes.eZone:
          const object = this.gamestate.zones.get().find((z) => z.id === zone.id);
          const actions = object.getActions(EventTypes.eLeaveZone);
          this.actions.start(actions);
          break;
      }
    });
    this.gamestate.zones.checked.set(newCheckedZones);
  }

}
