import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SettingsPageRoutingModule} from './settings-routing.module';

import {SettingsPage} from './settings.page';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ChangeProfilComponent} from './change-profil/change-profil.component';
import {InformationComponent} from './information/information.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, ChangePasswordComponent, ChangeProfilComponent, InformationComponent]
})
export class SettingsPageModule {
}
