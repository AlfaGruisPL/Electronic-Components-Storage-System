import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {LoginService} from "./_services/login.service";
import {Insomnia} from "@awesome-cordova-plugins/insomnia/ngx";
import {FooterService} from "./_services/footer.service";
import {Page} from "./_modal/page";

const {SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService, private insomnia: Insomnia, private footer: FooterService) {
  }

  componentDidLoad() {
    SplashScreen.hide(); //niby przyśpiesza ładowanie
    this.footer.footerSetPage.next(Page.login)
  }


  async ngOnInit() {
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
