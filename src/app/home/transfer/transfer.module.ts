import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TransferPageRoutingModule} from './transfer-routing.module';

import {TransferPage} from './transfer.page';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    TransferPageRoutingModule
  ],
  declarations: [TransferPage]
})
export class TransferPageModule {
}
