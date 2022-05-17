import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HireListPageRoutingModule } from './hire-list-routing.module';

import { HireListPage } from './hire-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HireListPageRoutingModule
  ],
  declarations: [HireListPage]
})
export class HireListPageModule {}
