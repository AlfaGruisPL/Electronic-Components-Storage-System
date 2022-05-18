import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from '../../../_services/qrcode.service';
import {ApiService} from '../../../_services/api.service';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
  public hireTime = '31';
  public elementID = '';
  customPopoverOptions: any = {
    header: 'Wybierz czas wypożyczenia',
    //subHeader: 'Select your hair color',
    message: 'W przypadku braku możliwości oddania na czas, istnieje możliwości przydłużenia wypożyczenia'
  };

  constructor(
    public _footer: FooterService,
    private qrCode: QrcodeService,
    private api: ApiService) {
  }

  ngOnInit() {
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
