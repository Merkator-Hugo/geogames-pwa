import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartZone } from 'src/app/model/cartridge/cart-zone';
import { ObjectTypes } from 'src/app/model/enums/object-types.enum';
import { EditService } from 'src/app/services/edit.service';
import { GameStateService } from 'src/app/services/game-state.service';
import { EditZoneComponent } from '../edit-zone/edit-zone.component';

@Component({
  selector: 'app-edit-list-zones',
  templateUrl: './edit-list-zones.component.html',
  styleUrls: ['./edit-list-zones.component.scss'],
})
export class EditListZonesComponent implements OnInit {

  public showZones = false;

  constructor(
    private gamestate: GameStateService,
    public editService: EditService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public toggleShowZones() {
    this.showZones = !this.showZones;
  }

  public addZone() {
    this.editService.zones.addNew();
    this.showZones = false;
  }

  public async showZone(zone: CartZone) {
    this.editService.current.zone.set(zone);
    if (this.gamestate.gui.screenWidth.isWide()) {
      this.editService.current.object.set(ObjectTypes.eZone);
    } else {
      const modal = await this.modalController.create({
        component: EditZoneComponent,
        cssClass: 'full-modal-class',
        // componentProps: {
        //   zone
        // }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.editService.current.zone.clear();
      const x = 1;
    }
  }

}
