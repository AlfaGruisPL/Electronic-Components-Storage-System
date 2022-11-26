import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
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
import {FooterComponent} from './_components/footer/footer.component';
import {CameraPreview} from '@awesome-cordova-plugins/camera-preview/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';


@NgModule({

  declarations: [AppComponent, FooterComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, NgxPaginationModule,
    IonicModule.forRoot({
      rippleEffect: true,
      mode: 'md'
    }),
    IonicStorageModule.forRoot()],
  providers: [ScreenOrientation, BarcodeScanner,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }, LeaveGuard, HttpService, ApiService, HTTP, Network, LoginGuard, Insomnia, CameraPreview],
  bootstrap: [AppComponent],
})
export class AppModule {
}
