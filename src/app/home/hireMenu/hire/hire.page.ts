import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from "../../../_services/qrcode.service";
import {ApiService} from "../../../_services/api.service";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {QrMode, QrOut} from "../../../_modal/qr-out";
import {ApiEndPoint} from "../../../_modal/api-end-point";
import {User} from "../../../_modal/user";
import {ApiResponse} from "../../../_modal/api-response";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
  public hireTime = '31';
  public elementIDArray = [];
  public modalPlaceIsOpen = false;
  public adminList: Array<User> = [];
  public selectedAdmin = 0;
  public opis = '';
  lock = false;
  unLock = false;
  public state = 1;
  options: any = {
    header: 'Wybierz czas wypożyczenia',
    message: 'W przypadku nie oddania na czas, istnieje możliwości przydłużenia wypożyczenia'
  };
  optionsAdminList: any = {
    header: 'Wybierz administartora',
    message: 'Wybrany administator będzie musiał potwierdzić wypożyczenie'
  };

  constructor(public _footer: FooterService,
              private qrCode: QrcodeService,
              public api: ApiService,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              public toastController: ToastController) {
  }

  timer: any;

  ngOnInit() {

  }


  ionViewWillEnter() {
    this.scanElement();

    this.api.getDefault(ApiEndPoint.listaAdministratowow).then((data: ApiResponse) => {
      data.value.forEach(k => {
        const obj = new User();
        Object.assign(obj, k);
        if (obj.zarchiwizowany === '0' && obj.aktywny === '1') {
          this.adminList.push(obj);
        }
      });
    });

  }

  ionViewDidLeave() {
    clearTimeout(this.timer);
    this.elementIDArray = [];
  }

  animate() {
    this.lock = true;
  }


  addHire(): void {
    this.scanElement();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async HireAccept() {
    this.state = 2;
    const dane = {
      opis: btoa(this.opis)
    };

    this.elementIDArray.forEach(kId => {
      console.log(kId)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.api.postDefault('wypozyczenieElementu/' + kId + '/' + this.hireTime + '/' + this.selectedAdmin, dane).then(async (dane: ApiResponse) => {
        if (!this.api.isAdmin()) {
          this.waitForCheck();
        } else {
          this.router.navigate(['/hire']);
          const alert = await this.alertController.create({
            header: 'Sukces',
            message: 'Wypożyczenie udane:<br>' + dane.value2,
            buttons: ['Rozumiem']
          });
          await alert.present();
        }
      }).catch(async error => {
        console.log(error)
        const alert = await this.alertController.create({
          header: 'Błąd',
          message: 'Wypożyczenie nie udane',
          buttons: ['Rozumiem']
        });
        await alert.present();
        this.router.navigate(['/hire']);
      });

    })

  }

  waitForCheck() {
    this.state = 2;
    let loading;
    this.timer = setInterval(() => {
      this.api.getDefault('sprawdzeniePotwierdzenia/' + this.elementIDArray).then(async (data: ApiResponse) => {

        // @ts-ignore
        if (data.value == 0) {
          loading = await this.loadingController.create({
            message: 'Oczekiwanie na potwierdzenie',
            duration: 2000
          });
          await loading.present();

          /*
          const toast = await this.toastController.create({
            header: 'Oczekiwanie na potwierdzenie',
            message: '',
            duration: 2000,
            icon: 'alert-circle-outline'
          });
          toast.present();
*/
        }
        // @ts-ignore
        if (data.value == 1) {
          loading.dismiss();
          clearTimeout(this.timer);
          this.lock = false;
          this.unLock = false;
          setTimeout(async () => {
            this.router.navigate(['/hire']);
            const alert = await this.alertController.create({
              header: 'Sukces',
              message: 'Wypożyczenie udane',
              buttons: ['Rozumiem']
            });
            await alert.present();
          }, 1300);

        }
        // @ts-ignore
        if (data.value == -1) {
          loading.dismiss();
          clearTimeout(this.timer);
          this.lock = false;
          this.unLock = false;
          setTimeout(async () => {
            this.router.navigate(['/hire']);
            const alert = await this.alertController.create({
              header: 'Uwaga',
              message: 'Wypożyczenie zostało odrzucone',
              buttons: ['Rozumiem']
            });
            await alert.present();
          }, 1300);

        }
      });


    }, 2000);

  }

  async scanElement(): Promise<void> {
    try {
      var k: QrOut = await this.qrCode.getInfoAdv('Zeskanuj elementy który chcesz wypożyczyć:', 'no');
    } catch (error) {
      if (this.elementIDArray.length == 0) {
        this._footer.back();
      }
      return;
    }
    if (k.mode !== QrMode.element) {
      return;
    }
    let tmpid = k.text.split(':')[1];
    if (this.elementIDArray.indexOf(tmpid) != -1) {
      alert('Element znajduje się już na liście ')
      return;
    }

    try {
      var data: ApiResponse = await this.api.getDefault('elementInfo/' + tmpid);

    } catch (error) {
      console.log(error)
      alert('elementInfo error')
      return;
    }
    console.log(data)
    if (data.value[0].wypozyczenieOczekujeNaPotwierdzenie == '1') {
      const toast = await this.toastController.create({
        message: 'Element niedostępny, aktualnie oczekuje na potwierdzenie wypożyczenia dla innego użytkownika',
        duration: 4000,
        position: 'top',
        icon: 'alert-outline',
        cssClass: 'betterToast',
        buttons: [
          {
            text: 'Schowaj',
            role: 'cancel',
            handler: () => {
              this._footer.showBanner();
            }
          }
        ],
      });
      this._footer.hideBanner(334000);
      toast.present();
      if (this.elementIDArray.length == 0) {
        this.router.navigate(['/hire']);
      }
      return;
    }
    if (data.value[0].aktualnieWypozyczony == '1') {
      const alert = await this.alertController.create({
        header: 'Uwaga',
        message: 'Element niedostępny, został już wypożyczony przez innego użytkownika',
        buttons: ['Rozumiem']
      });
      await alert.present();
      if (this.elementIDArray.length == 0) {
        this.router.navigate(['/hire']);
      }
      return;
    }
    if (data.value[0].mozliwosc_wypozyczania == '0') {
      const alert = await this.alertController.create({
        header: 'Uwaga',
        message: 'Administrator nie zezwala na wypożyczenie tego elementu',
        buttons: ['Rozumiem']
      });
      await alert.present();
      if (this.elementIDArray.length == 0) {
        this.router.navigate(['/hire']);
      }
      return;
    }

    this.elementIDArray.push(k.text.split(':')[1]);
  }
}
