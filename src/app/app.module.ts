import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpService} from './_services/http.service';
import {ApiService} from './_services/api.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import {Network} from '@awesome-cordova-plugins/network/ngx';
import {LoginGuard} from './_quards/login.guard';
import {LeaveGuard} from './_quards/leave.guard';
import {IonicStorageModule} from '@ionic/storage-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import {Insomnia} from '@awesome-cordova-plugins/insomnia/ngx';

@NgModule({

  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, NgxPaginationModule,
    IonicStorageModule.forRoot()],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }, LeaveGuard, BarcodeScanner, HttpService, ApiService, HTTP, Network, LoginGuard, Insomnia],
  bootstrap: [AppComponent],
})
export class AppModule {
}
