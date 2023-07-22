import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReturnHirePageRoutingModule} from './return-hire-routing.module';

import {ReturnHirePage} from './return-hire.page';
import {CommonModule} from "@angular/common";
import {ElementInPlaceInfoComponent} from "../../../_components/element-in-place-info/element-in-place-info.component";

@NgModule({
  imports: [

    IonicModule,
    ReturnHirePageRoutingModule,
    CommonModule,
    FormsModule,
  ],
  exports: [],
  declarations: [ReturnHirePage, ElementInPlaceInfoComponent]
})
export class ReturnHirePageModule {
}
