import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HireMenuPage} from './hireMenu.page';

const routes: Routes = [
  {
    path: '',
    component: HireMenuPage
  },
  {
    path: 'hire',
    loadChildren: () => import('./hire/hire.module').then(m => m.HirePageModule)
  },
  {
    path: 'hire-list',
    loadChildren: () => import('./hire-list/hire-list.module').then(m => m.HireListPageModule)
  },
  {
    path: 'my-hire',
    loadChildren: () => import('./my-hire/my-hire.module').then(m => m.MyHirePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirePageRoutingModule {
}
