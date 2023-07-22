import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyHireInformationPage} from './my-hire-information.page';
import {SharedModule} from "../../../../shredModule.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule
  ],
  declarations: [MyHireInformationPage,]
})
export class MyHireInformationPageModule {
}
