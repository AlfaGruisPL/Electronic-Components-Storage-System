import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HirePageRoutingModule} from './hire-routing.module';

import {HireMenuPage} from './hireMenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirePageRoutingModule
  ],
  declarations: [HireMenuPage]
})
export class HirePageModule {
}
