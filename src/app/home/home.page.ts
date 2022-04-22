import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { ApiService } from '../_services/api.service';
import { QrcodeService } from '../_services/qrcode.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private _api: ApiService, private _router:Router,private _qr: QrcodeService) {}

public  logOut():void{
    this._api.clearToken();
    this._router.navigate(['/'])
}

  getInfo():void{
    this._qr.getInfo().then(data=>{
      this._router.navigate(["/information/"+data.text.toString()+"/"+data.format.toString()])
    });
  }
  ToSearch():void{
    this._router.navigate(['../search'])
  }
}
