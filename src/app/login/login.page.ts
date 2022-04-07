import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login:string = "admin";
  public password:string = "123456";
  badPassword=false;
  badLogin = false;
  text:string = "..."
  format:string = "..."
  constructor(private _router:Router,private barcodeScanner: BarcodeScanner,public alertController: AlertController,private _api:ApiService,public toastController: ToastController) { }

  ngOnInit() {
  if(this._api.tokenExist()){
    alert(true)
    this._router.navigate(['panel'])
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
    this.barcodeScanner.scan({
      showTorchButton : true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if   available)
      prompt : "Nakieruj na kod QR który chcesz zeskanować", // Android
      resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    }).then(barcodeData => {
      this.text = barcodeData.text.toString();
      this.format = barcodeData.format.toString();
    }).catch(async err => {
      const alert = await this.alertController.create({
        header: 'UWAGA',
        message: 'Bład otwarcia skanera QR codów - ' + err,
        buttons: ['Rozumiem']
      });

      await alert.present();
      console.log('Error',);
    });
  }

  getInformationPage(){
    this._router.navigate(["home"])
  }
  getRegisterPage(){
    this._router.navigate(["register"])
  }
}
