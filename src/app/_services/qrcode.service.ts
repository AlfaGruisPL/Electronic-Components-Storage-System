import {Injectable} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {AlertController} from '@ionic/angular';
import {QrOut} from '../_modal/qr-out';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(public alertController: AlertController, private barcodeScanner: BarcodeScanner) {
  }

  getInfo(): Promise<QrOut> {
    return new Promise<QrOut>(((resolve, reject) => {
      this.barcodeScanner.scan({
        showTorchButton: true,
        torchOn: false,
        prompt: 'Nakieruj na kod QR który chcesz zeskanować',
        resultDisplayDuration: 0,
      }).then(barcodeData => {
        resolve(barcodeData)
        return barcodeData;
      }).catch(async err => {
        const alert = await this.alertController.create({
          header: 'UWAGA',
          message: 'Bład otwarcia skanera QR codów - ' + err,
          buttons: ['Rozumiem']
        });

        resolve({text: 'O_9', format: 'brak'});
        await alert.present();
        reject(err);
      });
    }));
  }

  getInfoAdv(promptText: string, def: string): Promise<QrOut> {
    return new Promise<QrOut>(((resolve, reject) => {
      this.barcodeScanner.scan({
        showTorchButton: true,
        torchOn: false,
        prompt: promptText,
        resultDisplayDuration: 0,
      }).then(barcodeData => {
        resolve(barcodeData);
        return barcodeData;
      }).catch(async err => {
        const alert = await this.alertController.create({
          header: 'UWAGA',
          message: 'Bład otwarcia skanera QR codów - ' + err,
          buttons: ['Rozumiem']
        });

        resolve({text: def, format: 'default'});
        await alert.present();
        reject(err)
      });
    }))
  }


}
