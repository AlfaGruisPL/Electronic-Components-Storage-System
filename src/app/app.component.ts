import {Component, isDevMode, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {LoginService} from "./_services/login.service";
import {Insomnia} from "@awesome-cordova-plugins/insomnia/ngx";
import {FooterService} from "./_services/footer.service";
import {Page} from "./_modal/page";
import {CameraPreview} from "@awesome-cordova-plugins/camera-preview/ngx";
import {ApiService} from "./_services/api.service";

const {SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  intervalStop: any;
  isDev = false;
  lastSerwerResponse = 0;

  constructor(private loginService: LoginService, private insomnia: Insomnia, private _api: ApiService,
              private footer: FooterService, private cameraPreview: CameraPreview
  ) {
  }

  returnTime(): number {
    var sum = 0;
    this._api.timeArray.forEach(k => {
      sum += k;
    });
    return Math.round(sum / this._api.timeArray.length);
  }

  async ionViewWillEnter() {

  }

  ionViewWillLeave() {
    clearInterval(this.intervalStop);
  }

  timerStart() {
    this.intervalStop = setInterval(() => {
      this.sendTimer();
      if (this._api.timeArray.length >= 10) {
        this._api.timeArray.reverse();
        this._api.timeArray = this._api.timeArray.slice(0, this._api.timeArray.length - 2)
        this._api.timeArray.reverse();
      }

    }, 1300);
  }

  sendTimer() {
    const time1 = new Date().getTime();
    this._api.getDefault('', 10).then(() => {
      if (this.lastSerwerResponse > 5) {
        this.lastSerwerResponse = 5;
      } else {
        if (this.lastSerwerResponse >= 1) {
          this.lastSerwerResponse = -1;
        }
        this.lastSerwerResponse < 0 ? this.lastSerwerResponse = 0 : null;
      }
    }).catch(() => {
      this.lastSerwerResponse += 1;
    });
  }

  componentDidLoad() {
    SplashScreen.hide(); //niby przyśpiesza ładowanie
    this.footer.footerSetPage.next(Page.login)

  }


  async ngOnInit() {
    this.isDev = isDevMode();
    this.sendTimer();
    this.timerStart();
    this.cameraPreview.stopCamera().then(data => {
      console.log(data)
    }).catch(data => {
      console.log(data)
    });
    /*

    */

    //! zabezpieczenie przed usypianiem się aplikacji !!!!!!!!!!!!!
    this.insomnia.keepAwake()
      .then(
        () => console.log('%cAnty sleep success', 'color:yellow'),
        reason => console.log('%cAnty sleep error', 'color:yellow')
      );


    this.loginService.startApp();

    /*    this.loginService.checkStorage().then(() => {
          loading.dismiss();
        }).catch(() => {
          loading.dismiss();
        });*/

  }
}
