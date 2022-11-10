import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../_services/api.service';
import {QrcodeService} from '../_services/qrcode.service';
import {FooterService} from '../_services/footer.service';
import {Page} from '../_modal/page';
import {MenuController} from "@ionic/angular";
import {ApiResponse} from "../_modal/api-response";
import {Notifications} from "../_modal/notifications";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public zalegleWypozyczenia = 0;
  public iloscWypozyczen = 0;
  public imieNazwisko = '---- ----';
  public powiadomienia = '0';
  public sumaWypozyczen = '0';
  public notificationsList: Array<Notifications> = [];
  private intervalNotification: any;

  constructor(public _api: ApiService,
              private _router: Router,
              private _qr: QrcodeService,
              public footer: FooterService,
              private menu: MenuController) {
  }

  ionViewDidLeave() {
    clearInterval(this.intervalNotification);
  }

  ionViewDidEnter() {
    this.getDate()
    this.intervalNotification = setInterval(() => this.getDate(), 8000);

    this.footer.footerSetPage.next(Page.home);

  }

  public async setNotifivationAsReaded(not: Notifications) {
    try {
      var odp = await this._api.getDefault('powiadomianieUstawJakoPrzeczytane/' + not.id);
    } catch (k) {
    }
    this.notificationsList = this.notificationsList.filter(k => k.id != not.id)
  }

  getInfo(): void {
    this._qr.getInfo().then(data => {
      this._router.navigate(["/information/" + data.text.toString() + "/" + data.format.toString()])
    });
  }

  ToNotifications(): void {
    this.footer.footerSetPage.next(Page.nextHome);
    // eslint-disable-next-line no-underscore-dangle
    this._router.navigate(['../notifications']);
  }

  toHire(): void {
    this.footer.footerSetPage.next(Page.nextHome);
    // eslint-disable-next-line no-underscore-dangle
    this._router.navigate(['../hire']);
  }

  toTransfer(): void {
    this.footer.footerSetPage.next(Page.nextHome);
    // eslint-disable-next-line no-underscore-dangle
    this._router.navigate(['../transfer']);
  }

  toPhotography(): void {
    this.footer.footerSetPage.next(Page.nextHome);
    // eslint-disable-next-line no-underscore-dangle
    this._router.navigate(['../photography']);
  }

  private getDate() {
    this._api.getDefault("uzytkownikPowiadomianiaNieOdebrane").then((k: ApiResponse) => {
      const tempArray: Array<Notifications> = [];
      k.value.forEach(notification => {
        tempArray.push(Object.assign(new Notifications(), notification));
      });
      if (JSON.stringify(tempArray) !== JSON.stringify(this.notificationsList)) {
        this.notificationsList = tempArray;
      }
    })


    this._api.getDefault('/uzytkownikStat').then((k: ApiResponse) => {
      const {zalegleWypozyczenia, iloscWypozyczen, imie, nazwisko, powiadomienia, sumaWypozyczen} = k.value[0];
      this.iloscWypozyczen = iloscWypozyczen;
      this.zalegleWypozyczenia = zalegleWypozyczenia;
      this.imieNazwisko = imie + ' ' + nazwisko;
      this.powiadomienia = powiadomienia;
      this.sumaWypozyczen = sumaWypozyczen;
    })
  }

}
