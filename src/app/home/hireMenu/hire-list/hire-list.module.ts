import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HireListPageRoutingModule} from './hire-list-routing.module';

import {HireListPage} from './hire-list.page';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HireListPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [HireListPage]
})
export class HireListPageModule {
}
