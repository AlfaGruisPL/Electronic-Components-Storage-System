import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {FooterService} from './footer.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController, private footer: FooterService) {
  }

  public async toast(toastData: any) {
    const toast = await this.toastController.create({
      ...toastData,
      //message: 'Logowanie udane',
      // duration: 400,
      position: 'top',
      //icon: 'key-outline',
      cssClass: 'betterToast',
      buttons: [
        {
          text: 'Schowaj',
          role: 'cancel',
          handler: () => {
            this.footer.showBanner();
          }
        }
      ],
    });
    toast.present();
    this.footer.hideBanner(toastData.duration);
  }
}
