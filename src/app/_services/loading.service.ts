import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) {
  }

  async create(title: string = 'Trwa pobieranie danych...'): Promise<void> {
    this.loading = await this.loadingController.create({
      message: title,
      spinner: 'bubbles',
      duration: 5000
    });
    await this.loading.present();
  }

  dismiss(): void {
    this.loading.dismiss().then(r => {
      console.log("dismiss")
    });
  }

}
