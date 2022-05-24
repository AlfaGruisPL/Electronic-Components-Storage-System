import {Component} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from "../../../_services/qrcode.service";
import {ApiService} from "../../../_services/api.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage {
  public hireTime = '31';
  public elementID = '';
  public rules = false;
  public modalPlaceIsOpen = false;
  customPopoverOptions: any = {
    header: 'Wybierz czas wypożyczenia',
    //subHeader: 'Select your hair color',
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
    this.rules = false;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async HireAccept(): Promise<void> {
    if (this.rules === false) {
      const toast = await this.toastController.create({
        message: 'Aby wyporzyczyć element musisz zaakceptować regulamin',
        duration: 700,
        position: 'top'
      });
      toast.present();
      return;
    }
    this.api.getDefault('hire/' + this.elementID + '/' + this.hireTime).then(async dane => {
      console.log(dane);
      const toast = await this.toastController.create({
        message: 'Wypożyczenie udane',
        duration: 700,
        position: 'top'
      });
      this.router.navigate(['/hire/hire-list']);
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
    this.qrCode.getInfoAdv('Zeskanuj miejsce docelowe:', 'K_3').then(k => {
      this.elementID = k.text.split('_')[1];
      this.api.getDefault('elementInfo/' + this.elementID).then(data => {
        console.log(data);
      });
    });
  }
}
