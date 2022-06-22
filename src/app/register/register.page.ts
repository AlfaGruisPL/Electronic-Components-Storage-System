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

  register(): void {
    //this.user
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
    }).catch(error => {
      console.log(error)
      this.buttonDisabled = false;
    })
  }
}

