import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OpenlayersComponent } from '../components/openlayers/openlayers.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ZoneListComponent } from '../components/zone-list/zone-list.component';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { NavigatorIconComponent } from '../components/navigator-icon/navigator-icon.component';
import { EditSmallscreenComponent } from '../components/edit-smallscreen/edit-smallscreen.component';
import { EditWidescreenComponent } from '../components/edit-widescreen/edit-widescreen.component';
import { EditListZonesComponent } from '../components/edit-list-zones/edit-list-zones.component';
import { EditListActionsComponent } from '../components/edit-list-actions/edit-list-actions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    NavigatorComponent,
    NavigatorIconComponent,
    OpenlayersComponent,
    MenuComponent,
    EditSmallscreenComponent,
    EditWidescreenComponent,
    EditListZonesComponent,
    EditListActionsComponent,
    ZoneListComponent,
    HomePage
  ]
})

export class HomePageModule {}
