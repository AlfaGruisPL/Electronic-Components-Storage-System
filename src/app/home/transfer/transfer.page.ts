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
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  cp: number = 1;
  public state = 0;
  public elementIDArray = [];
  public placeID = '';
  public tempData = new Date();
  public elementArray: ElementClass[] = [];
  public miejsce: Miejsce;
  public placePrimary: Miejsce;
  public transferList: Array<Transfer> = [];
  public buttonAccept = false;
  public description = '';

  constructor(
    private qrCode: QrcodeService,
    private _api: ApiService,
    private alertController: AlertController,
    private toastServise: ToastService,
    public _footer: FooterService,
    private loading: LoadingService,
    private router: Router) {
  }

  getHeight(): number {
    return Math.floor((document.getElementById('containerTran').clientHeight - 91 - document.getElementById('buttonTran').clientHeight) / 86);
  }

  ngOnInit() {
    this.loading.create();
    this.getList();
  }

  getList(): void {

    this._api.getDefault('transferForUser').then((data: ApiResponse) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const values = <Array<Transfer>>data.value;
      this.transferList = values;
      this.loading.dismiss();
    });
  }

  addElement(): void {
    this.scanElement()
  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj element:', 'K_3').then(async k => {
      const elementID = k.text.split(':')[1];

      if (this.elementArray.findIndex(k2 => String(k2.id) === elementID) !== -1) {
        const alert = await this.alertController.create({
          header: 'UWAGA',
          message: 'Element jest już na liście',
          buttons: ['Rozumiem']
        });
        await alert.present();
        return;
      }


      this._api.getDefault('elementInfo/' + elementID).then(async data => {
        if (data.value[0] != undefined) {
          const tmpElement = data.value[0];
          if (tmpElement.czyWypozyczone === '1') {
            const alert = await this.alertController.create({
              header: 'UWAGA',
              message: 'Element jest aktualnie wypożyczony',
              buttons: ['Rozumiem']
            });
            await alert.present();
            if (this.elementArray.length === 0) {
              console.log(this.elementArray)
              this.state = 0;
            }
            return;
          }
          this.elementArray.push(data.value[0]);
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
    })

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

    const dane: any = {};
    this.elementArray.forEach(elementTmp => {

      this._api.postDefault('transfer/' + elementTmp.id + '/' + this.placeID, dane).then(async data => {
        console.log(data)
        await this.toastServise.toast({
          message: 'Przenoszenie zakończone sukcesem',
          duration: 2500,
          icon: 'arrow-redo-outline'
        });

        this.state = 0;
        this.getList();
      }).catch(async error => {
        await this.toastServise.toast({
          message: 'Przenoszenie zakończone niepowodzeniem',
          duration: 2500,
          icon: 'arrow-redo-outline'
        });
        console.log(error);
      });
    })
  }

  toPlace(id: number | string): void {
    this.router.navigate(['information/miejsce:' + id + '/brak']);
  }
}
