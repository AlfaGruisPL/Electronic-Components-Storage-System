import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireListPage } from './hire-list.page';

const routes: Routes = [
  {
    path: '',
    component: HireListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HireListPageRoutingModule {}
