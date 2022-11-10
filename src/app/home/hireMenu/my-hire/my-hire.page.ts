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
import {AlertController, Platform} from "@ionic/angular";
import {ToastService} from "../../../_services/toast.service";


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
              private alertController: AlertController,
              private toast: ToastService,
              private loading: LoadingService) {
  }

  public openModal(hire: Hire): void {

    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.selectedHireInModal = hire;
      this.modalPlaceIsOpen = true;
      this._footer.bannerIconDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);


  }

  private getDataInterval: any;

  ionViewDidEnter() {
    // eslint-disable-next-line no-underscore-dangle
    // this._footer.footerSetPage.next(Page.nextHome);
  }

  ionViewDidLeave() {
    clearInterval(this.getDataInterval);
  }

  ngOnInit() {
    this.loading.create();
    this.getData();
    this.getDataInterval = setInterval(() => this.getData(), 5000);
  }

  private k = 0

  getData(): Promise<any> {
    return new Promise<any>((resolve) => {
      console.log(1)
      this._api.getDefault('wypozyczeniaUzytkownikaAktywne').then((data: ApiResponse) => {
        this.loading.dismiss();
        const tempHireList = [];
        const dataList: Array<Hire> = data.value;
        dataList.forEach(hire => {
          const hireTmp = new Hire();
          Object.assign(hireTmp, hire);
          tempHireList.push(hireTmp);
        });
        if (JSON.stringify(this.hireList) !== JSON.stringify(tempHireList)) {
          this.hireList = tempHireList;
        }
        this.k++;
        this.hireList = this.hireList.sort((k1: Hire, k2: Hire) => {
          return k1.timeToReturn() < k2.timeToReturn() ? -1 : 1;
          return 0;
        });
        resolve(true);
      });
    })
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

  async cancelHire(hire: Hire) {
    const alertI = await this.alertController.create({
      header: 'Uwaga',
      subHeader: 'Czy na pewno chcesz anulować wypożyczenie?',
      message: hire.nazwa_elementu,
      buttons: [
        {
          text: 'Nie',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Tak',
          handler: async () => {
            try {
              var odp = await this._api.getDefault('/anulowanieWypozyczenia/' + hire.id);
            } catch (k) {
              console.log('error');
            }
            if (odp['value'] == "1") {
              this.toast.toast({
                message: 'Wypożyczenie anulowane',
                duration: 3500,
                icon: 'close-circle-outline',
              });
              this.hireList = this.hireList.filter(k => k.id != hire.id);
            }
          }
        }
      ]
    });
    alertI.present();
  }


  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getData()
    event.target.complete();
  }
}

