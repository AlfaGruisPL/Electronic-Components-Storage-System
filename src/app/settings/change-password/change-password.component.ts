import {Component, OnInit} from '@angular/core';
import {User} from "../../_modal/user";
import {ToastController} from "@ionic/angular";
import {ApiService} from "../../_services/api.service";
import {FooterService} from "../../_services/footer.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss', '../settings.page.scss'],
})
export class ChangePasswordComponent implements OnInit {
  passwordModalIsOpen = false;
  changePasswordButtonDisabled = false;
  public user: User = new User();
  public modalPlaceIsOpen = false;

  constructor(private toastController: ToastController, private api: ApiService, public _footer: FooterService) {
  }

  ngOnInit() {
  }

  open(): void {
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.modalPlaceIsOpen = true;
      this._footer.bannerIconDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);
  }

  changePassword() {
    if (!this.user.checkPassword()) {
      this.dataError();
      return;
    }
    if (!this.user.passwordRegCheck()) {
      this.dataError();
      return;
    }
    this.changePasswordButtonDisabled = true;
    const json = {};
    json['haslo'] = this.user.haslo;
    this.api.postDefault('changePassword', json).then(async data => {
      this.changePasswordButtonDisabled = false;
      const toast = await this.toastController.create({
        message: 'Hasło zostało zmienione',
        duration: 3000,
        icon: 'checkmark-done-outline'
      });
      //this.router.navigate(['/login'])
      this.passwordModalIsOpen = false;
      toast.present();
    }).catch(async error => {
      console.log(error)
      this.changePasswordButtonDisabled = false;
      // if (String(error['status']) === '425') {
      const toast = await this.toastController.create({
        message: 'Zmiana hasła nieudana',
        duration: 2000,
        icon: 'alert-outline'
      });
      toast.present();
      //}

    });
  }

  private async dataError(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Dane nie są prawidłowe',
      duration: 2000,
      icon: 'alert-outline'
    });
    toast.present();
  }
}
