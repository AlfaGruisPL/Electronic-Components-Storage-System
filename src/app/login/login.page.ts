import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../_services/api.service';
import { QrcodeService } from '../_services/qrcode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public login:string = "admin";
  public password:string = "123456";
  badPassword=false;
  badLogin = false;
  constructor(private _router:Router ,public alertController: AlertController, private _qr: QrcodeService ,private _api:ApiService,public toastController: ToastController) { }


  async ionViewDidEnter() {
    const alert = await this.alertController.create({
      header: 'Potwierdzasz wylogowanie?',
      buttons: [
        {
          text: 'Nie',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this._router.navigate(['./home'])
          }
        }, {
          text: 'Tak',
          handler: () => {
            this._api.clearToken();
          }
        }
      ]
    });

    if (this._api.tokenExist() === true) {
      alert.present();
    }
  }
  logIn(){
    if(this.login.length < 1){
      this.badLogin= true;
    }else {
      this.badLogin= false;
    }
    if(this.password.length < 1){
      this.badPassword= true;
    }else {
      this.badPassword= false;
    }
    if(this.login.length>0 && this.password.length>0){
      this._api.login(this.login,this.password).then( async data => {
        const toast = await this.toastController.create({
          message: 'Logowanie udane',
          duration: 2000
        });
        toast.present();
        this._router.navigate(['home'])
      }).catch(async data => {
        const toast = await this.toastController.create({
          message: 'Logowanie nie udane',
          duration: 2000
        });
        toast.present();
      })
    }
  }

  getInfo():void{
    this._qr.getInfo().then(data=>{
      this._router.navigate(["/information/"+data.text.toString()+"/"+data.format.toString()])
    });
  }

  getInformationPage(){
    this._router.navigate(["home"])
  }
  getRegisterPage(){
    this._router.navigate(["register"])
  }
}
