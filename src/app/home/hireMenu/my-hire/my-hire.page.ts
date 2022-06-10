import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {FooterService} from "../../../_services/footer.service";
import {ApiResponse} from "../../../_modal/api-response";
import {Hire} from "../../../_modal/hire";
import {QrcodeService} from "../../../_services/qrcode.service";
import {QrOut} from "../../../_modal/qr-out";
import {Router} from "@angular/router";


@Component({
  selector: 'app-my-hire',
  templateUrl: './my-hire.page.html',
  styleUrls: ['./my-hire.page.scss'],
})
export class MyHirePage implements OnInit {
  // @ts-ignore
  public hireList: Array<Hire> = [];
  public modalPlaceIsOpen = false;
  public selectedHireInModal: Hire | undefined;

  constructor(public _footer: FooterService, private _api: ApiService, private qrCode: QrcodeService, private router: Router) {
  }

  public openModal(hire: Hire): void {
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.selectedHireInModal = hire;
      this.modalPlaceIsOpen = true;
    }, 10);


  }

  ngOnInit() {
    this._api.getDefault('wyporzyczeniaUzytkownikaAktywne').then((data: ApiResponse) => {
      const dataList: Array<Hire> = data.value;
      dataList.forEach(hire => {
        const hireTmp = new Hire();
        Object.assign(hireTmp, hire);
        this.hireList.push(hireTmp);
      });
      this.hireList = this.hireList.sort((k1: Hire, k2: Hire) => {
        return k1.timeToReturn() < k2.timeToReturn() ? -1 : 1;
        return 0;
      });
    });
  }


  returnHire(): void {
    this.modalPlaceIsOpen = false;
    setTimeout(() => {

      this.router.navigate(['../hire/return-hire']);
    }, 10);
  }

  scanPlace(): void {
    this.qrCode.getInfoAdv('Zeskanuj miejsce docelowe', 'K_3').then((data: QrOut) => {
      console.log(data.text);
    });
  }
}

