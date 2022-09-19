import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';
import {QrcodeService} from "../../../_services/qrcode.service";
import {ApiService} from "../../../_services/api.service";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {QrMode} from "../../../_modal/qr-out";
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
  public elementID = '';
  public modalPlaceIsOpen = false;
  public adminList: Array<User> = [];
  public selectedAdmin = 0;
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
              private api: ApiService,
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
    this.elementID = '';
  }

  animate() {
    this.lock = true;
  }


  // eslint-disable-next-line @typescript-eslint/naming-convention
  async HireAccept() {
    this.state = 2;

    this.api.getDefault('wypozyczenieElementu/' + this.elementID + '/' + this.hireTime + '/' + this.selectedAdmin).then(async dane => {
      this.waitForCheck();
    }).catch(async error => {
      const alert = await this.alertController.create({
        header: 'Błąd',
        message: 'Wypożyczenie nie udane',
        buttons: ['Rozumiem']
      });
      await alert.present();
      this.router.navigate(['/hire']);
    });
  }


  waitForCheck() {
    this.state = 2;
    this.timer = setInterval(() => {
      this.api.getDefault('sprawdzeniePotwierdzenia').then(async (data: ApiResponse) => {
        if (data.value[0] === '0') {
          const loading = await this.loadingController.create({
            message: 'Oczekiwanie na potwierdzenie',
            duration: 2000
          });
          await loading.present();

          const toast = await this.toastController.create({
            header: 'Oczekiwanie na potwierdzenie',
            message: '',
            duration: 2000,
            icon: 'alert-circle-outline'
          });
          toast.present();

        } else {
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
      })
    }, 2000);

  }

  scanElement(): void {
    this.qrCode.getInfoAdv('Zeskanuj elementy który chcesz wypożyczyć:', 'no').then(k => {
      if (k.mode === QrMode.element) {
        this.elementID = k.text.split(':')[1];
        this.api.getDefault('elementInfo/' + this.elementID).then(async (data: ApiResponse) => {
          if (data.value[0].aktualnieWypozyczony == '1') {
            const alert = await this.alertController.create({
              header: 'Uwaga',
              message: 'Element jest aktualnie wypożyczony przez innego użytkownika',
              buttons: ['Rozumiem']
            });
            await alert.present();
            this.router.navigate(['/hire']);
            return;
          }
          if (data.value[0].mozliwosc_wypozyczania == '0') {
            const alert = await this.alertController.create({
              header: 'Uwaga',
              message: 'Administrator nie zezwala na wypożyczenie tego elementu',
              buttons: ['Rozumiem']
            });
            await alert.present();
            this.router.navigate(['/hire']);
            return;
          }

        });
      } else {
        this._footer.back();
      }
    }).catch(() => {
      this._footer.back();
    });
  }
}
