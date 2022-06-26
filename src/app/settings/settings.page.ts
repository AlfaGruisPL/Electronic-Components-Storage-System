import {Component, OnInit} from '@angular/core';
import {ApiService} from "../_services/api.service";
import {AlertController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  constructor(private api: ApiService, public toastController: ToastController, public alertController: AlertController) {
  }

  ngOnInit() {
  }

  async dezactiveAccount(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Uwaga',
      subHeader: 'Czy chcesz dezaktywować swoje konto ?',
      message: 'Aby ponowanie aktywować konto skontaktuj się z administratorem systemu',
      inputs: [
        {
          name: 'input',
          type: 'text',
          placeholder: 'Wpisz "tak" aby potwierdzić'
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
        }, {
          text: 'Dezaktywuj',
          id: 'confirm-button',
          handler: async (params) => {
            if (params.input.toLowerCase().replace(/\s+/g, '') !== 'tak') {
              const toast = await this.toastController.create({
                header: 'Aby dezaktywować konto wpisz "tak" w pole tekstowe',
                message: 'Dezaktywacja anulowana',
                duration: 3000,
                icon: 'alert-circle-outline'
              });
              toast.present();
              return;
            }
            this.api.getDefault('dezaktywujKonto').then(async k => {
              const toast = await this.toastController.create({
                header: 'Twoje konto zostało dezaktywowane',
                message: 'Trwa wylogowanie...',
                duration: 5000,
                icon: 'alert-circle-outline'
              });
              toast.present();
              setTimeout(() => {
                this.api.clearToken();
              }, 5000);
            }).catch(error => {
              console.log(error);
            })
          }
        }
      ]
    });

    await alert.present();


  }
}
