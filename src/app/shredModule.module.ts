import {NgModule} from '@angular/core';
import {ElementInPlaceInfoComponent} from './_components/element-in-place-info/element-in-place-info.component';
import {IonicModule} from "@ionic/angular";
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,

    IonicModule.forRoot(),
  ],
  declarations: [
    ElementInPlaceInfoComponent
  ],
  exports: [
    ElementInPlaceInfoComponent,
  ]
})
export class SharedModule {
}
