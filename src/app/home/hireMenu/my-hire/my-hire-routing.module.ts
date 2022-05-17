import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHirePage } from './my-hire.page';

const routes: Routes = [
  {
    path: '',
    component: MyHirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHirePageRoutingModule {}
