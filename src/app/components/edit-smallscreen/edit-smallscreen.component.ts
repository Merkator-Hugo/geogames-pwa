import { Component, OnInit } from '@angular/core';
import { CartZone } from 'src/app/model/cartridge/cart-zone';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-smallscreen',
  templateUrl: './edit-smallscreen.component.html',
  styleUrls: ['./edit-smallscreen.component.scss'],
})
export class EditSmallscreenComponent implements OnInit {

  constructor(
    public editService: EditService
  ) { }

  ngOnInit() {}

  close(){}

  save(){
    this.editService.cartridge.save();
  }

}
