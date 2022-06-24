import {Component, OnInit} from '@angular/core';
import {FooterService} from "../_services/footer.service";
import {User} from "../_modal/user";
import {ApiService} from "../_services/api.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

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

  /**
   * test
   */
  ngOnInit() {
  }

  private async dataError(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Dane nie są prawidłowe',
      duration: 2000,
      //      icon: 'checkmark-done-outline'
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
        //      icon: 'checkmark-done-outline'
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
      const toast = await this.toastController.create({
        message: 'Konto zostało zarejestrowane, na podany adres email został wysłany email z linkiem potwierdzającym',
        duration: 7000,
        icon: 'checkmark-done-outline'
      });
      this.router.navigate(['/login'])
      toast.present();
    }).catch(async error => {
      if (String(error['status']) === '425') {
        const toast = await this.toastController.create({
          message: 'Podany adres email jest już zarejestrowany',
          duration: 2000,
        });
        toast.present();
      }
      this.buttonDisabled = false;
    })
  }
}

