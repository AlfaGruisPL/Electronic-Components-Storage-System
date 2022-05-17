import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyHirePageRoutingModule } from './my-hire-routing.module';

import { MyHirePage } from './my-hire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHirePageRoutingModule
  ],
  declarations: [MyHirePage]
})
export class MyHirePageModule {}
