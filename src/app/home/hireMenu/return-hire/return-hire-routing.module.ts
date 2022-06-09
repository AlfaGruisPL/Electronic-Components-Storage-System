import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnHirePage } from './return-hire.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnHirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnHirePageRoutingModule {}
