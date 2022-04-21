import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@capacitor/status-bar';
import { HttpService } from './_services/http.service';
import { ApiService } from './_services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { LoginGuard } from './_quards/login.guard';
import { LeaveGuard } from './_quards/leave.guard';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({

  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,
    IonicStorageModule.forRoot()],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LeaveGuard,BarcodeScanner,HttpService,ApiService,HTTP,Network,LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
