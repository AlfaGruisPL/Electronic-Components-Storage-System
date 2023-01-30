import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyHireInformationPageRoutingModule} from './my-hire-information-routing.module';

import {MyHireInformationPage} from './my-hire-information.page';
import {
  ElementInPlaceInfoComponent
} from "../../../../_components/element-in-place-info/element-in-place-info.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHireInformationPageRoutingModule
  ],
  declarations: [MyHireInformationPage, ElementInPlaceInfoComponent]
})
export class MyHireInformationPageModule {
}
