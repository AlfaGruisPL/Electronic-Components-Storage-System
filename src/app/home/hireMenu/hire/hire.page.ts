import {Component} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from "../../../_services/qrcode.service";
import {ApiService} from "../../../_services/api.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {QrMode} from "../../../_modal/qr-out";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage {
  public hireTime = '31';
  public elementID = '';
  public modalPlaceIsOpen = false;
  customPopoverOptions: any = {
    header: 'Wybierz czas wypożyczenia',
    message: 'W przypadku nie oddania na czas, istnieje możliwości przydłużenia wypożyczenia'
  };

  constructor(public _footer: FooterService,
              private qrCode: QrcodeService,
              private api: ApiService,
              private router: Router,
              public toastController: ToastController) {
  }

  ionViewWillEnter() {
    this.scanElement();
  }

  ionViewDidLeave() {
    this.elementID = '';
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async HireAccept(): Promise<void> {

    this.api.getDefault('hire/' + this.elementID + '/' + this.hireTime).then(async dane => {
      console.log(dane);
      const toast = await this.toastController.create({
        message: 'Wypożyczenie udane',
        duration: 700,
        position: 'top'
      });
      this.router.navigate(['/hire/my-hire']);
      toast.present();
    }).catch(async error => {
      const toast = await this.toastController.create({
        message: 'Wypożyczenie nie udane',
        duration: 700,
        position: 'top'
      });
      this.router.navigate(['/hire']);
      toast.present();
    });
  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj elementy który chcesz wypożyczyć:', 'no').then(k => {
      if (k.mode !== QrMode.other) {
        this.elementID = k.text.split(':')[1];
        this.api.getDefault('elementInfo/' + this.elementID).then(data => {
          console.log(data);
        });
      } else {
        this._footer.back();
      }
    }).catch(() => {
      this._footer.back();
    });
  }
}
