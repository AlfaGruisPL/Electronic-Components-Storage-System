import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {LoginService} from "./_services/login.service";
import {LoadingController} from "@ionic/angular";
import {Insomnia} from "@awesome-cordova-plugins/insomnia/ngx";

const {SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService, public loadingController: LoadingController, private insomnia: Insomnia) {
  }

  componentDidLoad() {
    SplashScreen.hide(); //niby przyśpiesza ładowanie

  }


  async ngOnInit() {
    //! zabezpieczenie przed usypianiem się aplikacji !!!!!!!!!!!!!
    this.insomnia.keepAwake()
      .then(
        () => console.log('%cAnty sleep success', 'color:yellow'),
        reason => console.log('%cAnty sleep error', 'color:yellow')
      );


    const loading = await this.loadingController.create({
      message: 'Trwa automatyczne logowanie...',
    });
    await loading.present();
    this.loginService.checkStorage().then(() => {
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });

  }
}
