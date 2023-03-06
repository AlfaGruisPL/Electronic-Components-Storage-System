import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// eslint-disable-next-line max-len
import {CameraPreview, CameraPreviewPictureOptions} from '@awesome-cordova-plugins/camera-preview/ngx';
import {ApiService} from "../../_services/api.service";
import {QrcodeService} from "../../_services/qrcode.service";
import {FileService} from "../../_services/file.service";
import {Location} from "@angular/common";
import {ToastController} from "@ionic/angular";
import {QrMode} from "../../_modal/qr-out";
import {Page} from "../../_modal/page";
import {FooterService} from "../../_services/footer.service";
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.page.html',
  styleUrls: ['./photography.page.scss'],
})
export class PhotographyPage implements OnInit {
  path: SafeUrl = '';
  displayView = false;
  viewHeight = "0px";
  sendInfo = 0.0;
  sendInfoCounter = 0
  displayButton = true;
  state = 0;
  sendImageId = 0;
  imageData = '';
  imageName = 'Zdjecie';
  elementId = 0;
  placeId = 0;

  constructor(private sanitizer: DomSanitizer,
              private cameraPreview: CameraPreview,
              private location: Location,
              public FileService: FileService,
              private api: ApiService,
              private _footer: FooterService,
              private qr: QrcodeService,
              private toast: ToastService,
              private toastController: ToastController) {

  }

  ionViewDidEnter() {
    this._footer.footerSetPage.next(Page.nextHome);
  }

  ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }

  async ngOnInit() {
    // this.FileService.sendFast();
    this.cameraPreview.stopCamera();
    this.state0();
  }


  takeFoto(): void {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 960,
      // width: 1280,
      //  height: 960,
      quality: 95
    };
    this.cameraPreview.takePicture(pictureOpts).then((imageData: Array<string>) => {
      this.displayView = false;
      this.state = 2;
      this.imageData = imageData[0];
      this.path = 'data:image/jpeg;base64,' + imageData[0];
    }, (err) => {
      console.log(err);

    }).finally(() => {
      this.cameraPreview.stopCamera();
    });
  }

  sendFoto(): void {
    console.log(1)
    this.displayButton = false;
    this.FileService.sendImage(this.imageData, this.imageName + '.png').then(k => {
      this.sendImageId = k;
      var title = '';
      var titleDelete = '';
      var id = 0;
      if (this.placeId !== 0) {
        title = 'miejceImageID';
        id = this.placeId;
      } else {
        id = this.elementId;
        title = 'elementImageID';
      }
      console.log(this.sendImageId)
      this.api.getDefault(title + '/' + id + '/' + this.sendImageId).then(async data => {
        this.location.back();
        this.imageSendSuccess();
        this.FileService.sendInfo.next(0);
      }).catch(async error => {
        this.imageSendFail();
        this.location.back();
        console.log(error);
      });
    }).catch(k => {
      console.log(k)
    });
  }

  async getPhoto() {
    this.path = '';
    this.viewHeight = window.screen.width * 1.333 + "px";
    this.cameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.width * 1.333,
      camera: 'rear',
      tapPhoto: false,
      storeToFile: false,
      previewDrag: false,
      toBack: false,
      alpha: 1
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }).catch(error => {
      console.log(error)
    });
    await this.cameraPreview.show().then(data => {
      console.log(data)

    }).catch(data => {
      console.log(data)
    });
    this.displayView = true;
  }

  public state1() {
    this.cameraPreview.stopCamera();
    setTimeout(() => {
      this.getPhoto();
      setTimeout(() => {
        this.state = 1;
      }, 10);
    }, 10);
  }

  private state0() {
    this.state = 0;
    this.qr.getInfoAdv('Zeskanuj element', "").then(async k => {
      if (k.cancelled) {
        this.location.back();
      }
      if (k.mode != QrMode.element && k.mode != QrMode.place) {
        const toast = await this.toastController.create({
          header: 'Zeskanowany kod nie jest elementem lub miejscem',
          //message: 'Zeskanowana wartość',
          duration: 3500,
          icon: 'information-circle',
          position: 'bottom',
        });
        this.location.back();
        toast.present();
        return;
      }
      if (k.mode === QrMode.element) {
        this.elementId = k.id;
        this.placeId = 0;
      } else if (k.mode === QrMode.place) {
        this.placeId = k.id;
        this.elementId = 0;
      }
      console.log(k);
      this.state1();

    }).catch(error => {
      console.log(error);
      this.location.back();
    });
  }

  private async imageSendSuccess(): Promise<void> {
    this.toast.toast({
      message: 'Zdjęcie elementu/miejsca zostało ustawione',
      //message: 'Zeskanowana wartość',
      duration: 4500,
      icon: 'information-circle',
      //position: 'bottom',
    })
  }

  private async imageSendFail(): Promise<void> {
    this.toast.toast({
      message: 'Zdjęcie elementu/miejsca nie zostało ustawione',
      duration: 4500,
      icon: 'alert-outline',
    });
  }
}


/*



import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// eslint-disable-next-line max-len
import {CameraPreview, CameraPreviewPictureOptions} from '@awesome-cordova-plugins/camera-preview/ngx';
import {ApiService} from "../../_services/api.service";
import {QrcodeService} from "../../_services/qrcode.service";
import {FileService} from "../../_services/file.service";
import {Location} from "@angular/common";
import {ToastController} from "@ionic/angular";
import {QrMode} from "../../_modal/qr-out";
import {Page} from "../../_modal/page";
import {FooterService} from "../../_services/footer.service";
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-photography',
  templateUrl: './photography.page.html',
  styleUrls: ['./photography.page.scss'],
})
export class PhotographyPage implements OnInit {
  path: SafeUrl = '';
  displayView = false;
  viewHeight = "0px";
  sendInfo = 0.0;
  sendInfoCounter = 0
  displayButton = true;
  state = 0;
  sendImageId = 0;
  imageData = '';
  imageName = 'Zdjecie';
  elementId = 0;
  placeId = 0;

  constructor(private sanitizer: DomSanitizer,
              private cameraPreview: CameraPreview,
              private location: Location,
              public FileService: FileService,
              private api: ApiService,
              private _footer: FooterService,
              private qr: QrcodeService,
              private toast: ToastService,
              private toastController: ToastController) {

  }

  ionViewDidEnter() {
    this._footer.footerSetPage.next(Page.nextHome);
  }

  ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }

  async ngOnInit() {
    this.cameraPreview.stopCamera();
    this.state0();
  }


  takeFoto(): void {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 960,
      // width: 1280,
      //  height: 960,
      quality: 95
    };
    this.cameraPreview.takePicture(pictureOpts).then((imageData: Array<string>) => {
      this.displayView = false;
      this.state = 2;
      this.imageData = imageData[0];
      this.path = 'data:image/jpeg;base64,' + imageData[0];
    }, (err) => {
      console.log(err);

    }).finally(() => {
      this.cameraPreview.stopCamera();
    });
  }

  sendFoto(): void {
    this.displayButton = false;
    this.FileService.sendImage(this.imageData, this.imageName + '.png').then(k => {
      this.sendImageId = k;
      var title = '';
      var titleDelete = '';
      var id = 0;
      if (this.placeId !== 0) {
        title = 'miejceImageID';
        id = this.placeId;
      } else {
        id = this.elementId;
        title = 'elementImageID';
      }
      this.api.getDefault(title + '/' + id + '/' + this.sendImageId).then(async data => {
        this.location.back();
        this.imageSendSuccess();
      }).catch(async error => {
        this.imageSendFail();
        console.log(error);
      });
    });
  }

  async getPhoto() {
    this.path = '';
    this.viewHeight = window.screen.width * 1.333 + "px";
    this.cameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.width * 1.333,
      camera: 'rear',
      tapPhoto: false,
      storeToFile: false,
      previewDrag: false,
      toBack: false,
      alpha: 1
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }).catch(error => {
      console.log(error)
    });
    await this.cameraPreview.show().then(data => {
      console.log(data)

    }).catch(data => {
      console.log(data)
    });
    this.displayView = true;
  }

  public state1() {
    this.cameraPreview.stopCamera();
    setTimeout(() => {
      this.getPhoto();
      setTimeout(() => {
        this.state = 1;
      }, 10);
    }, 10);
  }

  private state0() {
    this.state = 0;
    this.qr.getInfoAdv('Zeskanuj element', "").then(async k => {
      if (k.cancelled) {
        this.location.back();
      }
      if (k.mode != QrMode.element && k.mode != QrMode.place) {
        const toast = await this.toastController.create({
          header: 'Zeskanowany kod nie jest elementem lub miejscem',
          //message: 'Zeskanowana wartość',
          duration: 3500,
          icon: 'information-circle',
          position: 'bottom',
        });
        this.location.back();
        toast.present();
        return;
      }
      if (k.mode === QrMode.element) {
        this.elementId = k.id;
        this.placeId = 0;
      } else if (k.mode === QrMode.place) {
        this.placeId = k.id;
        this.elementId = 0;
      }
      console.log(k);
      this.state1();

    }).catch(error => {
      console.log(error);
      this.location.back();
    });
  }

  private async imageSendSuccess(): Promise<void> {
    this.toast.toast({
      message: 'Zdjęcie elementu/miejsca zostało ustawione',
      //message: 'Zeskanowana wartość',
      duration: 4500,
      icon: 'information-circle',
      //position: 'bottom',
    })
  }

  private async imageSendFail(): Promise<void> {
    this.toast.toast({
      message: 'Zdjęcie elementu/miejsca nie zostało ustawione',
      duration: 4500,
      icon: 'alert-outline',
    });
  }
}

 */
