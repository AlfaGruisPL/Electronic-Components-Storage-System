import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from "../../../_services/qrcode.service";
import {ApiService} from "../../../_services/api.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
  public hireTime = '31';
  public elementID = '';
  public rules = false;
  customPopoverOptions: any = {
    header: 'Wybierz czas wypożyczenia',
    //subHeader: 'Select your hair color',
    message: 'W przypadku nie oddania na czas, istnieje możliwości przydłużenia wypożyczenia'
  };

  constructor(public _footer: FooterService,
              private qrCode: QrcodeService,
              private api: ApiService,
              public toastController: ToastController) {
  }

  ngOnInit() {
  }

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
    this.api.getDefault('hire/' + this.elementID + '/' + this.hireTime).then(dane => {
      console.log(dane);
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
