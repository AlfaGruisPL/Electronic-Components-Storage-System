import {Component, OnInit} from '@angular/core';
import {QrcodeService} from '../../_services/qrcode.service';
import {ApiService} from '../../_services/api.service';
import {ElementClass} from '../../_modal/element';
import {AlertController} from '@ionic/angular';
import {Miejsce} from '../../_modal/miejsce';
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  public state = 0;
  public elementID = '';
  public placeID = '';
  public tempData = new Date();
  public element: ElementClass;
  public miejsce: Miejsce;
  public placePrimary: Miejsce;

  constructor(
    private qrCode: QrcodeService,
    private _api: ApiService,
    private alertController: AlertController,
    private router: Router) {
  }

  ngOnInit() {

  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj element:', 'K_3').then(k => {
      this.elementID = k.text.split('_')[1];

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
      this.placeID = k.text.split('_')[1];

      this._api.getDefault('miejsce/' + this.placeID).then(async data => {
        if (data.value[0] != undefined) {
          this.state = 2;
          this.miejsce = data.value[0];
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
    console.log(this.placeID);
  }

  toPlace(): void {
    this.router.navigate(['information/O_9/brak']);
  }
}
