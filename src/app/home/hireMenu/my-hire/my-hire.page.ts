import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {FooterService} from "../../../_services/footer.service";
import {ApiResponse} from "../../../_modal/api-response";
import {Hire} from "../../../_modal/hire";
import {QrcodeService} from "../../../_services/qrcode.service";
import {QrOut} from "../../../_modal/qr-out";
import {Router} from "@angular/router";
import {LoadingService} from "../../../_services/loading.service";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";


@Component({
  selector: 'app-my-hire',
  templateUrl: './my-hire.page.html',
  styleUrls: ['./my-hire.page.scss'],
})
export class MyHirePage implements OnInit {
  public cp = 1;
  public hireList: Array<Hire> = [];
  public modalPlaceIsOpen = false;
  public selectedHireInModal: Hire | undefined;
  private sub: Subscription;

  constructor(public _footer: FooterService,
              private _api: ApiService,
              private qrCode: QrcodeService,
              private platform: Platform,
              private router: Router,
              private loading: LoadingService) {
  }

  public openModal(hire: Hire): void {

    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.selectedHireInModal = hire;
      this.modalPlaceIsOpen = true;
      this._api.singalDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);


  }

  ionViewDidEnter() {
    // eslint-disable-next-line no-underscore-dangle
    // this._footer.footerSetPage.next(Page.nextHome);
  }


  ngOnInit() {
    this.loading.create();
    this._api.getDefault('wypozyczeniaUzytkownikaAktywne').then((data: ApiResponse) => {
      this.loading.dismiss();
      const dataList: Array<Hire> = data.value;
      dataList.forEach(hire => {
        const hireTmp = new Hire();
        Object.assign(hireTmp, hire);
        this.hireList.push(hireTmp);
      });
      console.log(this.hireList)
      this.hireList = this.hireList.sort((k1: Hire, k2: Hire) => {
        return k1.timeToReturn() < k2.timeToReturn() ? -1 : 1;
        return 0;
      });
    });
  }


  ionViewWillLeave() {
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

