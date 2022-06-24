import {Injectable} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {AlertController, ToastController} from '@ionic/angular';
import {QrMode, QrOut} from '../_modal/qr-out';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(public alertController: AlertController, private barcodeScanner: BarcodeScanner, private toastController: ToastController) {
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

        resolve({text: '&_9', format: 'brak'});
        await alert.present();
        reject(err);
      });
    }));
  }

  getInfoAdv(promptText: string, def: string): Promise<QrOut | undefined> {
    return new Promise<QrOut>(((resolve, reject) => {
      this.barcodeScanner.scan({
        showTorchButton: true,
        torchOn: false,
        prompt: promptText,
        resultDisplayDuration: 0,
      }).then(async (barcodeData: QrOut) => {
        if (barcodeData.cancelled == true) {
          console.log(barcodeData)
          reject(undefined);
          return;
        }
        if (barcodeData.text.charAt(0).toUpperCase() === 'K' && barcodeData.text.charAt(1) === '_') {
          barcodeData.mode = QrMode.element;
          barcodeData.id = Number(barcodeData.text.split('_')[1]);
        } else if (barcodeData.text.charAt(0).toUpperCase() === '&' && barcodeData.text.charAt(1) === '_') {
          barcodeData.mode = QrMode.place;
          barcodeData.id = Number(barcodeData.text.split('_')[1]);
        } else {
          const toast = await this.toastController.create({
            header: 'Element lub miejsce nie zostało rozpoznane w zeskanowany kodzie',
            message: 'Zeskanowana wartość: ' + barcodeData.text,
            duration: 4500,
            icon: 'information-circle',
            position: 'bottom',
          });
          toast.present();
          barcodeData.mode = QrMode.other;
          resolve(barcodeData);
        }
      }).catch(async err => {
        const alert = await this.alertController.create({
          header: 'UWAGA',
          message: 'Bład otwarcia skanera QR codów - ' + err,
          buttons: ['Rozumiem']
        });
        resolve({text: def, format: 'default'});
        await alert.present();
        reject(err);
      });
    }));
  }


}
