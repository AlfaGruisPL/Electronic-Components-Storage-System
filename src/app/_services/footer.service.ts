import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {QrcodeService} from './qrcode.service';
import {Location} from '@angular/common';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Page} from '../_modal/page';
import {ApiService} from './api.service';
import {QrMode} from '../_modal/qr-out';
import {Platform, ToastController} from '@ionic/angular';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public footerSetPage: BehaviorSubject<Page> = new BehaviorSubject<Page>(Page.login);
  public BackHistory: Array<string> = [];
  public logInButton = false;
  public logOutButton = false;
  public settingsButton = false;
  public exploreButton = false;
  public backButton = false;
  public registerButton = false;
  public menuButton = false;
  private backSub: Subscription;
  private lastClick = new Date().getTime();

  constructor(private _router: Router,
              private activeRoute: ActivatedRoute,
              private _qr: QrcodeService,
              private location: Location,
              private _api: ApiService,
              private platform: Platform,
              public toastController: ToastController) {
    //tworzenie tablicy poprzednich stron
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.BackHistory.push(event.url);
    });

    //uruchomienie nasłuchiwacza i przejęcie przycisku cofania
    this.backObserver();


    this.footerSetPage.subscribe(val => {
      // @ts-ignore
      setTimeout(() => {
        this.logInButton = false;
        this.logOutButton = false;
        this.settingsButton = false;
        this.exploreButton = false;
        this.backButton = false;
        this.registerButton = false;
        this.menuButton = false;
        switch (val) {
          case Page.login:
            this.registerButton = true;
            break;
          case Page.register:
            this.logInButton = true;
            break;
          case Page.home:
            this.logOutButton = true;
            this.settingsButton = true;
            break;
          case Page.settings:
            this.backButton = true;
            break;
          case Page.nextHome:
            //this.backButton = true;
            this.settingsButton = true;
            this.menuButton = true;
            break;
          case Page.page:
            this.backButton = true;
            this.settingsButton = true;
            break;
        }
      }, 2);
    });
  }


  getInfo(): void {
    if (!this.stoper()) {
      return;
    }
    this._qr.getInfo().then(async data => {
      if (data.mode != QrMode.other) {
        this._router.navigate(['/information/' + data.text.toString() + '/' + data.format.toString()]);
      }
    }).catch(() => {
    });
  }

  private stoper(): boolean {
    if (this.lastClick < new Date().getTime() - 420) {
      this.lastClick = new Date().getTime();
      return true;
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getRegisterPage(): void {
    if (!this.stoper()) {
      return;
    }
    this._router.navigate(['/register']);
    this.footerSetPage.next(Page.register);
  }

  ToLogin(): void {
    if (!this.stoper()) {
      return;
    }
    this._router.navigate(['/login']);
    this.footerSetPage.next(Page.login);
  }

  ToMenu(): void {
    if (!this.stoper()) {
      return;
    }
    this._router.navigate(['/home']);
    this.footerSetPage.next(Page.home);
  }

  tologOut(): void {
    if (!this.stoper()) {
      return;
    }
    this._api.clearToken();
    this._router.navigate(['/']);
    this.footerSetPage.next(Page.login);
  }

  back(): void {
    if (!this.stoper()) {
      return;
    }
    this.backFunction();
    //this.location.back();
  }

  goToSettings() {
    if (!this.stoper()) {
      return;
    }
    this._router.navigate(['/settings']);
    this.footerSetPage.next(Page.settings);
  }

  public closeModalAndResetBackObserver() {
    this.resetBackPromise.next(true);
    this._api.singalDisplay = true;
    this.backObserver();
  }

  private resetBackPromise: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public backObserver(modal: boolean = false): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
      var sub = this.resetBackPromise.subscribe(resetSignal => {
        if (resetSignal) {
          console.log('%c ResetSignal Modal back button handler, switch to back mode', 'color:yellow');
          resolve(false);
          this.resetBackPromise.next(false);
          sub.unsubscribe();

        }
      });
      if (!modal) {
        this.backSub = this.platform.backButton.subscribeWithPriority(1000, () => {
          this.backFunction();
          this._api.singalDisplay = true;
          sub.unsubscribe();
          resolve(true);
        });
      } else {
        this.backSub = this.platform.backButton.subscribeWithPriority(1000, () => {
          this.backObserver();
          sub.unsubscribe();
          this._api.singalDisplay = true;
          console.log('%cModal back button handler, switch to back mode', 'color:yellow');
          resolve(false);
        });
      }
    });
  }

  private backFunction() {
    if (this.BackHistory[this.BackHistory.length - 2] !== '/login' && this.BackHistory[this.BackHistory.length - 1] !== '/home') {
      this.location.back();
      this.BackHistory.pop();
      console.log("Cofnij")
    } else {
      console.log('%cCofanie zablokowane', 'color:silver');
    }
    if (this.BackHistory.length > 10) {
      this.BackHistory.shift();
    }
  }

}
