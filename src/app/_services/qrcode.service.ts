import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { QrOut } from '../_modal/qr-out';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor( public alertController: AlertController,private barcodeScanner: BarcodeScanner) { }

  getInfo():Promise<QrOut>{
    return new Promise<QrOut>(((resolve, reject) => {
      this.barcodeScanner.scan({
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if   available)
        prompt : "Nakieruj na kod QR który chcesz zeskanować", // Android
        resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      }).then(barcodeData => {
       resolve(barcodeData)
        return barcodeData;
      }).catch(async err => {
        const alert = await this.alertController.create({
          header: 'UWAGA',
          message: 'Bład otwarcia skanera QR codów - ' + err,
          buttons: ['Rozumiem']
        });

        resolve({text:"K_1",format:"test"})
        await alert.present();
        reject(err)
      });
    }))


  }
}
