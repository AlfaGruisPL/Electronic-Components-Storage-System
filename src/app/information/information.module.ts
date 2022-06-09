import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InformationPageRoutingModule} from './information-routing.module';

import {InformationPage} from './information.page';
import {ElementInPlaceInfoComponent} from '../_components/element-in-place-info/element-in-place-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPageRoutingModule
  ],
  declarations: [InformationPage, ElementInPlaceInfoComponent]
})
export class InformationPageModule {
}
