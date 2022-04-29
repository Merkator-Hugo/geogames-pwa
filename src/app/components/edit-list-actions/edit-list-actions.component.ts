import { Component, OnInit } from '@angular/core';
import { CartAction } from 'src/app/model/cartridge/cart-action';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-list-actions',
  templateUrl: './edit-list-actions.component.html',
  styleUrls: ['./edit-list-actions.component.scss'],
})
export class EditListActionsComponent implements OnInit {

  public showActions = false;

  constructor(
    public editService: EditService
  ) { }

  ngOnInit() {}

  public toggleShowActions() {
    this.showActions = !this.showActions;
  }

  public addAction() {
    // this.editService.actions.addNew();
    this.showActions = false;
  }

  public showAction(action: CartAction) {

  }

}
