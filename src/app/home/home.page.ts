import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../_services/api.service';
import {QrcodeService} from '../_services/qrcode.service';
import {FooterService} from '../_services/footer.service';
import {Page} from '../_modal/page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public _api: ApiService, private _router: Router, private _qr: QrcodeService, private footer: FooterService) {
  }

  ionViewWillEnter() {
    this.footer.footerSetPage.next(Page.home);
  }

  getInfo(): void {
    this._qr.getInfo().then(data => {
      this._router.navigate(["/information/" + data.text.toString() + "/" + data.format.toString()])
    });
  }

  ToSearch(): void {
    this.footer.footerSetPage.next(Page.nextHome);
    // eslint-disable-next-line no-underscore-dangle
    this._router.navigate(['../search']);
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
}
