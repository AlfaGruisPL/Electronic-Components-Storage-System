import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HireMenuPage} from './hireMenu.page';

const routes: Routes = te[
  {
    path: '',
    component: HireMenuPage
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirePageRoutingModule {
}
