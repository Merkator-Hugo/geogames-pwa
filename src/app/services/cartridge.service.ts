import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import View from 'ol/View';
import { GameAction } from '../model/actions/game-action';
import { GameActions } from '../model/actions/game-actions';
import { CartStart } from '../model/cartridge/cart-start';
import { ActionTypes } from '../model/utils/action-types.enum';
import { EventTypes } from '../model/utils/event-types.enum';
import { GameLocation } from '../model/utils/game-location';
import { ObjectTypes } from '../model/utils/object-types.enum';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  // private cartridge = {
  //   start: {
  //     view: {
  //       center: [5.6464749, 51.7330457],
  //       zoom: 18
  //     },
  //     player: [5.6464749, 51.7330457]
  //   },
  //   zones: [
  //     {
  //       id: '#zone0',
  //       zone: 'POLYGON((5.646 51.7335, 5.647 51.7335, 5.647 51.734, 5.646 51.734, 5.646 51.7335))',
  //       isVisible: true,
  //       isActive: true,
  //       actions: [
  //         {
  //           event: EventTypes.eEnterZone,
  //           ids: '#action1;#action6'
  //         },
  //         {
  //           event: EventTypes.eLeaveZone,
  //           ids: '#action2;#action5'
  //         }
  //       ]
  //     },
  //     {
  //       id: '#zone1',
  //       zone: 'POLYGON((5.6465 51.7335, 5.6475 51.7335, 5.6475 51.734, 5.6465 51.734, 5.6465 51.7335))',
  //       isVisible: false,
  //       isActive: false,
  //       actions: [
  //         {
  //           event: EventTypes.eEnterZone,
  //           ids: '#action3'
  //         },
  //         {
  //           event: EventTypes.eLeaveZone,
  //           ids: '#action4'
  //         }
  //       ]
  //     }
  //   ],
  //   actions: [
  //     {
  //       id: '#action1',
  //       type: ActionTypes.eMessage,
  //       name: '',
  //       payload: { message: 'you entered zone 1'}
  //     },
  //     {
  //       id: '#action2',
  //       type: ActionTypes.eMessage,
  //       name: '',
  //       payload: { message: 'you left zone 1'}
  //     },
  //     {
  //       id: '#action3',
  //       type: ActionTypes.eMessage,
  //       name: '',
  //       payload: { message: 'you entered zone 2'}
  //     },
  //     {
  //       id: '#action4',
  //       type: ActionTypes.eMessage,
  //       name: '',
  //       payload: { message: 'you left zone 2'}
  //     },
  //     {
  //       id: '#action5',
  //       type: ActionTypes.eVisibility,
  //       name: '',
  //       payload: { type: ObjectTypes.eZone, id: '#zone1', state: true }
  //     },
  //     {
  //       id: '#action5',
  //       type: ActionTypes.eActivation,
  //       name: '',
  //       payload: { type: ObjectTypes.eZone, id: '#zone0', state: true }
  //     }
  //   ]
  // };
  private cartridge;

  constructor(
    private game: GameStateService,
    private httpClient: HttpClient
  ) { }

  load() {
    this.httpClient.get('/assets/cartridges/test.json').subscribe(
      (result) => {
        this.cartridge = result;
        this.handleCartridge();
      }
    );
  }

  private handleCartridge() {
    const actions: Map<string, GameAction> = new Map();
    this.game.start.set(
      new CartStart(
        new View({
          center: new GameLocation(this.cartridge.start.view.center[0], this.cartridge.start.view.center[1], 'EPSG:4326').getCoords(),
          zoom: this.cartridge.start.view.zoom
        }),
        new GameLocation(this.cartridge.start.player[0], this.cartridge.start.player[1], 'EPSG:4326')
      )
    );
    this.cartridge.actions.forEach((action) => {
      actions.set(action.id, new GameAction(action.id, action.type, action.name, action.payload));
    });
    this.cartridge.zones.forEach((zone) => {
      this.game.zones.add(zone.zone, zone.id, zone.isVisible, zone.isActive);
      zone.actions.forEach((action) => {
        const ids = action.ids.split(';');
        const acts = new GameActions();
        ids.forEach((id) => {
          acts.add(actions.get(id));
        });
        this.game.actions.add(ObjectTypes.eZone, zone.id, action.event, acts);
      });
    });
    this.game.run();
  }

}
