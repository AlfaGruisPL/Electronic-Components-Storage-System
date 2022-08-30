import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {Hire} from "../../../_modal/hire";
import {ElementClass} from "../../../_modal/element";
import {QrcodeService} from "../../../_services/qrcode.service";
import {QrMode, QrOut} from "../../../_modal/qr-out";
import {Router} from "@angular/router";
import {ApiResponse} from "../../../_modal/api-response";
import {Miejsce} from "../../../_modal/miejsce";
import {ToastController} from "@ionic/angular";
import {Location} from "@angular/common";

@Component({
  selector: 'app-return-hire',
  templateUrl: './return-hire.page.html',
  styleUrls: ['./return-hire.page.scss'],
})
export class ReturnHirePage implements OnInit {
  public hire: Hire = new Hire();
  public state = 0;

  public element: ElementClass = new ElementClass();
  public elementId: number = 0;
  public targetPlace: Array<Miejsce> = []
  public returnHireButton = true;
  public modalPlaceIsOpen = false;

  constructor(private router: Router,
              private api: ApiService,
              private qrScaner: QrcodeService,
              public toastController: ToastController,
              public location: Location
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.scanElement();
  }

  scanPlace() {
    this.qrScaner.getInfoAdv('Zeskanuj miejsce odłożenia elementu', '&_3').then((data: QrOut) => {
      if (data.mode === QrMode.place) {
        this.api.getDefault('miejsce/' + data.id).then((apiOut: ApiResponse) => {

          this.targetPlace = apiOut.value;
          this.returnHireButton = false;
          console.log(apiOut)
        });
        this.state = 2;

      } else {
        this.isNotPlace();
      }
    });

  }

  scanElement() {
    this.qrScaner.getInfoAdv('Zeskanuj element który chcesz oddać', 'element:3').then(async (data: QrOut) => {
      if (data.mode === QrMode.element) {
        this.api.getDefault('elementInfo/' + data.id).then((val: ApiResponse) => {
          if (val.value.length === 0) {
            this.notFoundElement();
          } else {
            this.element = val.value[0];
            this.checkElementIsHire(this.element.id);
          }
        });
      } else if (data.mode === QrMode.place) {
        this.isNotElement();
        this.location.back()

      }

    }).catch(data => {
      this.location.back()
    });
  }

  public returnHire(): void {
    this.returnHireButton = true;
    this.api.getDefault('oddawanieElementu/' + this.element.id + '/' + this.hire.id + '/' + this.targetPlace[this.targetPlace?.length - 1]?.id).then(async val => {
      const alert = await this.qrScaner.alertController.create({
        header: 'Sukces',
        message: 'Element został zwrócony poprawnie. Proszę odłożyć element do zeskanowanego miejsca',
        buttons: ['Rozumiem']
      });

      this.router.navigate(['../hire']);
      await alert.present();
    }).catch(async error => {
      const alert = await this.qrScaner.alertController.create({
        header: 'UWAGA',
        message: 'Błąd zwrócenia elementu',
        buttons: ['Rozumiem']
      });
      await alert.present();
    });
  }

  private checkElementIsHire(id: number) {
    this.api.getDefault('wypozyczenieElementuDlaUzytkownika/' + id).then((val: ApiResponse) => {
      this.element = val.value2[0];
      if (val.value.length > 0) {
        Object.assign(this.hire, val.value[0]);
        this.state = 1;
      } else {
        this.notFoundElementInHire();
      }
    });
  }


  private async notFoundElementInHire() {
    const toast = await this.toastController.create({
      header: 'Zeskanowany element nie jest wypożyczony',
      message: 'Nazwa elementu: ' + this.element.nazwa,
      duration: 3000,
      icon: 'alert-circle-outline'
    });
    toast.present();
    /*
        const alert = await this.qrScaner.alertController.create({
          header: 'UWAGA',
          message: 'Element ' + this.element.nazwa + ' nie jest wypożyczony',
          buttons: ['Rozumiem']
        });
        await alert.present();*/
  }

  private async notFoundElement() {
    const toast = await this.toastController.create({
      header: 'Element nie został odnaleziony w systemie magazynowania',
      duration: 3000,
      icon: 'alert-circle-outline'
    });
    toast.present();
    /*
    const alert = await this.qrScaner.alertController.create({
      header: 'UWAGA',
      message: 'Element nie został odnaleziony w systemie magazynowania',
      buttons: ['Rozumiem']
    });
    await alert.present();*/
  }

  private async isNotElement() {
    const toast = await this.toastController.create({
      header: 'Zeskanowany kod nie należy do grupy elementów',
      duration: 3000,
      icon: 'alert-circle-outline'
    });
    toast.present();
    /*  const alert = await this.qrScaner.alertController.create({
        header: 'UWAGA',
        message: 'Zeskanowany kod nie należy do grupy elementów',
        buttons: ['Rozumiem']
      });
      await alert.present();*/
  }

  private async isNotPlace() {
    const toast = await this.toastController.create({
      header: 'Zeskanowany kod nie należy do grupy miejsc',
      duration: 3000,
      icon: 'alert-circle-outline'
    });
    /*
    const alert = await this.qrScaner.alertController.create({
      header: 'UWAGA',
      message: 'Zeskanowany kod nie należy do grupy miejsc',
      buttons: ['Rozumiem']
    });
    await alert.present();*/
  }


}
