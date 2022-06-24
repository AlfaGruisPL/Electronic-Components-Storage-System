import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {QrcodeService} from './qrcode.service';
import {Location} from '@angular/common'
import {BehaviorSubject} from "rxjs";
import {Page} from "../_modal/page";
import {ApiService} from "./api.service";
import {QrMode} from "../_modal/qr-out";
import {ToastController} from "@ionic/angular";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public footerSetPage: BehaviorSubject<Page> = new BehaviorSubject<Page>(Page.login);
  public BackHistory: Array<string> = [];

  constructor(private _router: Router,
              private activeRoute: ActivatedRoute,
              private _qr: QrcodeService,
              private location: Location,
              private _api: ApiService,
              public toastController: ToastController) {
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.BackHistory.push(event.url);
      console.info(this.BackHistory);
    });
  }

  getInfo(): void {
    this._qr.getInfo().then(async data => {
      if (data.mode != QrMode.other) {
        this._router.navigate(["/information/" + data.text.toString() + "/" + data.format.toString()])
      }
    }).catch(() => {

    });
  }

  getRegisterPage(): void {
    this._router.navigate(['/register']);
    this.footerSetPage.next(Page.register);
  }

  ToLogin(): void {
    this._router.navigate(['/login']);
    this.footerSetPage.next(Page.login);
  }

  ToMenu(): void {
    this._router.navigate(['/home']);
    this.footerSetPage.next(Page.home);
  }

  tologOut(): void {
    this._api.clearToken();
    this._router.navigate(['/']);
    this.footerSetPage.next(Page.login);
  }

  back(): void {
    this.location.back();
  }
}
