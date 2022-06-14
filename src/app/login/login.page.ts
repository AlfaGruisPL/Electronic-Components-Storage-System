import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {ApiService} from '../_services/api.service';
import {FooterService} from '../_services/footer.service';
import {LoginService} from "../_services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public login = '';// '/mateusz@s.pwste.edu.pl';
  public password = ''; //'123456';
  badPassword = false;
  badLogin = false;
  public keedPass = false;

  constructor(private loginService: LoginService,
              private _router: Router,
              public _footer: FooterService,
              public alertController: AlertController,
              private _api: ApiService,
              public toastController: ToastController) {
  }


  async ionViewDidEnter() {
    this.loginService.checkStorage().then(() => {
    }).catch(() => {
    })
    /*
    const alertI = await this.alertController.create({
      header: 'Potwierdzasz wylogowanie?',
      buttons: [
        {
          text: 'Nie',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this._router.navigate(['./home']);
          }
        }, {
          text: 'Tak',
          handler: () => {
            this._api.clearToken();
          }
        }
      ]
    });

    // eslint-disable-next-line no-underscore-dangle
    if (this._api.tokenExist() === true) {
      alertI.present();
    } else {

      const storage = await this.storage.create();
      this._storage = storage;
      this.storage.get('login').then(log => {
        this.storage.get('password').then(pass => {
          if (log.length > 0 && pass.length > 0) {
            this.login = log;
            this.password = pass;
            this.logInF();
          }
        }).catch(b => {
          //alert(b)
        });
      }).catch(a => {
        //alert(a)
      });


    }*/
  }

  logIn() {
    if (this.login.length < 1) {
      this.badLogin = true;
    } else {
      this.badLogin = false;
    }
    if (this.password.length < 1) {
      this.badPassword = true;
    } else {
      this.badPassword = false;
    }
    if (this.login.length > 0 && this.password.length > 0) {
      this.loginService.logInF(this.login, this.password, this.keedPass).then(dane => {

      }).catch(error => {
        console.log(error)
      });
    }

  }


}
