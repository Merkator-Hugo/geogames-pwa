import { Component, OnInit } from '@angular/core';
import { CartZone } from 'src/app/model/cartridge/cart-zone';
import { ObjectTypes } from 'src/app/model/enums/object-types.enum';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-widescreen',
  templateUrl: './edit-widescreen.component.html',
  styleUrls: ['./edit-widescreen.component.scss'],
})
export class EditWidescreenComponent implements OnInit {

  public objectTypes: ObjectTypes[];
  public currentZone: CartZone;

  constructor(
    public editService: EditService
  ) {}

  ngOnInit() {
    this.objectTypes = Object.values(ObjectTypes).filter(item => isNaN(Number(item)));
  }

}
