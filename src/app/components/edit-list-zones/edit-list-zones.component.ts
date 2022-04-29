import { Component, OnInit } from '@angular/core';
import { CartZone } from 'src/app/model/cartridge/cart-zone';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-list-zones',
  templateUrl: './edit-list-zones.component.html',
  styleUrls: ['./edit-list-zones.component.scss'],
})
export class EditListZonesComponent implements OnInit {

  public showZones = false;

  constructor(
    public editService: EditService
  ) { }

  ngOnInit() {}

  public toggleShowZones() {
    this.showZones = !this.showZones;
  }

  public addZone() {
    this.editService.zones.addNew();
    this.showZones = false;
  }

  public showZone(zone: CartZone) {

  }

}
