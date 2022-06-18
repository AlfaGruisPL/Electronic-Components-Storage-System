import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {ApiService} from '../_services/api.service';
import {FooterService} from '../_services/footer.service';
import {LoginService} from "../_services/login.service";
import {HttpService} from "../_services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public login = 'mateusz@s.pwste.edu.pl';// '/';
  public password = '123456'; //'';
  badPassword = false;
  badLogin = false;
  public keedPass = false;

  constructor(private loginService: LoginService,
              private _router: Router,
              public _footer: FooterService,
              public alertController: AlertController,
              private _api: ApiService,
              private http: HttpService,
              public toastController: ToastController) {
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
        console.log(dane)
      }).catch(error => {
        console.log(error)
      });
    }

  }


}
