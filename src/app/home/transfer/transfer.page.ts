import {Component, OnInit} from '@angular/core';
import {QrcodeService} from '../../_services/qrcode.service';
import {ApiService} from '../../_services/api.service';
import {ElementClass} from '../../_modal/element';
import {AlertController} from '@ionic/angular';
import {Miejsce} from '../../_modal/miejsce';
import {Router} from "@angular/router";
import {ApiResponse} from "../../_modal/api-response";
import {Transfer} from "../../_modal/transfer";
import {FooterService} from "../../_services/footer.service";
import {LoadingService} from "../../_services/loading.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  cp: number = 1;
  public state = 0;
  public elementID = '';
  public placeID = '';
  public tempData = new Date();
  public element: ElementClass;
  public miejsce: Miejsce;
  public placePrimary: Miejsce;
  public transferList: Array<Transfer> = [];
  public buttonAccept = false;
  public description = '';

  constructor(
    private qrCode: QrcodeService,
    private _api: ApiService,
    private alertController: AlertController,
    public _footer: FooterService,
    private loading: LoadingService,
    private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.loading.create();
    this._api.getDefault('transferForUser').then((data: ApiResponse) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const values = <Array<Transfer>>data.value;
      this.transferList = values;
      this.loading.dismiss();
    });
  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj element:', 'K_3').then(k => {
      this.elementID = k.text.split(':')[1];
      this._api.getDefault('elementInfo/' + this.elementID).then(async data => {
        if (data.value[0] != undefined) {
          this.element = data.value[0];
          this.state = 1;
        } else {
          const alert = await this.alertController.create({
            header: 'UWAGA',
            message: 'Nie znaleziono elementu w bazie danych',
            buttons: ['Rozumiem']
          });
          await alert.present();
          this.state = 0;
        }
      });
    });
  }

  scanTargetPlace(): void {
    this.qrCode.getInfoAdv('Zeskanuj miejsce docelowe:', '0_9').then(k => {
      this.placeID = k.text.split(':')[1];

      this._api.getDefault('miejsce/' + this.placeID).then(async data => {
        if (data.value[0] != undefined) {
          this.state = 2;
          this.miejsce = data.value[data.value.length - 1];
        } else {
          const alert = await this.alertController.create({
            header: 'UWAGA',
            message: 'Nie znaleziono miejsca w bazie danych',
            buttons: ['Rozumiem']
          });
          await alert.present();
          this.state = 1;
        }
      });
    });
  }


  accept(): void {
    this.buttonAccept = false;
    const dane: any = {};
    dane['uwagi'] = this.description;
    this._api.postDefault('transfer/' + this.elementID + '/' + this.placeID, dane).then(async data => {
      const alert = await this.alertController.create({
        header: 'Informacja',
        message: 'Przenoszenie zakończone sukcesem',
        buttons: ['Rozumiem']
      });
      await alert.present();
      this.state = 0;
      this.getList();
    });
    console.log(this.placeID);
  }

  toPlace(id: number): void {
    this.router.navigate(['information/miejsce:' + id + '/brak']);
  }
}
