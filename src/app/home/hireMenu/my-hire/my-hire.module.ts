import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyHirePageRoutingModule} from './my-hire-routing.module';

import {MyHirePage} from './my-hire.page';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHirePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [MyHirePage]
})
export class MyHirePageModule {
}
