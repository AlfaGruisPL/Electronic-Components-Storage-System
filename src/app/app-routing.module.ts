import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './_quards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [LoginGuard],
    // canDeactivate:[LeaveGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./home/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'information/:text/:format',
    loadChildren: () => import('./information/information.module').then(m => m.InformationPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'transfer',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/transfer/transfer.module').then(m => m.TransferPageModule)
  },
  {
    path: 'hire',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/hireMenu/hire.module').then(m => m.HirePageModule)
  },
  {

    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
