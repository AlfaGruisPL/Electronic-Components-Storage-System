import {Component, OnInit} from '@angular/core';
import {FooterService} from "../_services/footer.service";
import {User} from "../_modal/user";
import {ApiService} from "../_services/api.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Page} from "../_modal/page";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = new User();
  public buttonDisabled = false;

  constructor(public _footer: FooterService,
              private api: ApiService,
              private toastController: ToastController,
              private router: Router) {
  }

  ionViewWillEnter() {
    this._footer.footerSetPage.next(Page.register);
    /*    this.user.imie = "kkkk"
        this.user.email = "s37219@s.pwste.edu.pl"
        this.user.haslo = "zaq1@WSX"
        this.user.haslo2 = "zaq1@WSX"
        this.user.nr_indeksu = "132131"
        this.user.nazwisko = "asd"
     */
  }

  ngOnInit() {
  }

  private async dataError(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Dane nie są prawidłowe',
      duration: 2000,
      icon: 'alert-outline'
    });
    toast.present();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async register(): Promise<void> {
    if (!this.user.checkData()) {
      this.dataError();
      return;
    }
    if (!this.user.checkEmail()) {
      const toast = await this.toastController.create({
        message: 'Podany adres email nie należy do adresów należących do uczelni PWSTE Jarosław',
        duration: 2000,
        icon: 'alert-outline'
      });
      toast.present();
      return;
    }

    if (!this.user.checkPassword()) {
      this.dataError();
      return;
    }
    if (!this.user.passwordRegCheck()) {
      this.dataError();
      return;
    }
    this.buttonDisabled = true;
    const json = {};
    json['imie'] = this.user.imie;
    json['email'] = this.user.email;
    json['haslo'] = this.user.haslo;
    json['nr_indeksu'] = this.user.nr_indeksu;
    json['nazwisko'] = this.user.nazwisko;
    this.api.postDefault('register', json).then(async data => {
      console.log(data)
      this.buttonDisabled = false;
      const toast = await this.toastController.create({
        message: 'Konto zostało zarejestrowane, na podany adres email został wysłany email z linkiem potwierdzającym',
        duration: 7000,
        icon: 'checkmark-done-outline'
      });
      this.router.navigate(['/login'])
      toast.present();
    }).catch(async error => {

      console.log(error)
      this.buttonDisabled = false;
      if (String(error['status']) === '425') {
        const toast = await this.toastController.create({
          message: 'Podany adres email jest już zarejestrowany',
          duration: 2000,
          icon: 'alert-outline'
        });
        toast.present();
      }

    })
  }
}

