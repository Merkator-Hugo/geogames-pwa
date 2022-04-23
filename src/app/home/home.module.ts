import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OpenlayersComponent } from '../components/openlayers/openlayers.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ZoneListComponent } from '../components/zone-list/zone-list.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    OpenlayersComponent,
    MenuComponent,
    ZoneListComponent,
    HomePage
  ],
  providers: [Geolocation]
})

export class HomePageModule {}
