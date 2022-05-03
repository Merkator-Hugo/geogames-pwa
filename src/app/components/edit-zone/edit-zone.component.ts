import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CartZone } from 'src/app/model/cartridge/cart-zone';
import { EditService } from 'src/app/services/edit.service';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss'],
})
export class EditZoneComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private gamestate: GameStateService,
    private editService: EditService,
    public modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const zone = this.editService.current.zone.get();
    this.form = this.formBuilder.group({
      id: [zone.id.get(), Validators.required],
      name: [zone.name.get(), Validators.required],
      visible: [zone.visibility.get(), Validators.required],
      active: [zone.activation.get(), Validators.required],
    });
  }

  save() {
    const zone = this.editService.current.zone.get();
    zone.id.set(this.form.controls.id.value);
    zone.name.set(this.form.controls.name.value);
    zone.visibility.set(this.form.controls.visible.value);
    zone.activation.set(this.form.controls.active.value);
    this.editService.current.object.clear();
    this.editService.current.zone.clear();
    if (!this.gamestate.gui.screenWidth.isWide()) {
      this.modalController.dismiss({
        zone
      });
    }
  }

  close() {
    this.editService.current.object.clear();
    this.editService.current.zone.clear();
    if (!this.gamestate.gui.screenWidth.isWide()) {
      this.modalController.dismiss();
    }
  }

}
