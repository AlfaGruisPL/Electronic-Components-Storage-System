import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHireInformationPage } from './my-hire-information.page';

const routes: Routes = [
  {
    path: '',
    component: MyHireInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHireInformationPageRoutingModule {}
