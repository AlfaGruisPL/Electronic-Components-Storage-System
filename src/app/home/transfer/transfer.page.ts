import {Component, OnInit} from '@angular/core';
import {QrcodeService} from '../../_services/qrcode.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  public state = 0;

  constructor(private qrCode: QrcodeService) {
  }

  ngOnInit() {

  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj element:').then(k => {
      this.state = 1;
    });
  }

  scanTargetPlace(): void {
    this.qrCode.getInfoAdv('Zeskanuj miejsce docelowe:').then(k => {
      this.state = 2;
    });
    ;
  }
}
