import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// eslint-disable-next-line max-len
import {CameraPreview, CameraPreviewPictureOptions} from '@awesome-cordova-plugins/camera-preview/ngx';
import {ApiService} from "../../_services/api.service";

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
  time = 0;

  constructor(private sanitizer: DomSanitizer, private cameraPreview: CameraPreview, private api: ApiService) {
    this.cameraPreview.stopCamera();
  }

  async ngOnInit() {
    this.getPhoto();
  }


  sendEnd() {

  }

  sendPart(max: number, i: number, image: string, cut): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = {};

      data['file_name'] = new Date().getTime() + "test.png";
      data['file_data'] = image.substring(i * cut, (i + 1) * cut);
      data['file_size'] = data['file_data'].length;
      data['file_time'] = this.time;
      var part = '';
      if (i === 0) {
        part = '(';
      } else if (image.substring((i + 1) * cut, (i + 2) * cut).length === 0) {
        part = ')';
      } else {
        part = '' + i;
      }
      data['file_part'] = part;


      this.api.postDefault('file', data).then(response => {
        //  console.log(response);
        this.sendInfo = i / max;
        if (part !== ')') {
          this.sendPart(max, i + 1, image, cut);
        } else {
          this.sendInfo = 1;
        }
        resolve(true);
      }).catch(error => {
        console.log(error);
      })
    })
  }

  takeFoto() {
    this.time = new Date().getTime();
    this.displayView = false;
    const pictureOpts: CameraPreviewPictureOptions = {
      //width: 1280,
      // height: 960,
      // width: 1280,
      //  height: 960,
      quality: 85
    };
    this.cameraPreview.takePicture(pictureOpts).then((imageData: Array<string>) => {
      const cut = 5500;
      const max = Math.round(imageData[0].length / cut);
      this.sendPart(max, 0, imageData[0], cut);
      /*   const parts = [];
         var last;
         var part = '';

         var i = 0;
         while (part !== ')') {
           const data = {};

           data['file_name'] = new Date().getTime() + "test.png";
           data['file_data'] = imageData[0].substring(i * cut, (i + 1) * cut);
           data['file_size'] = data['file_data'].length;

           if (i === 0) {
             part = '(';
           } else if (imageData[0].substring((i + 1) * cut, (i + 2) * cut).length === 0) {
             part = ')';
           } else {
             part = '' + i;
           }
           data['file_part'] = part;
           if (part !== ')') {
             parts.push(data);
           } else {
             last = data;
           }
           i++;
         }
   // Wysyłanie

         const promises = [];
         parts.forEach(k => {
           promises.push(
             this.api.postDefault('file', k).then(val => {
               console.log(val);
               this.sendInfoCounter += 1;
               this.sendInfo = this.sendInfoCounter / max;
             })
           )
         })

         Promise.all(promises).then(data => {
           console.log(data)

           this.api.postDefault('file', last).then(val => {
             console.log(val)
             this.sendInfo = 1;
           })
         })
  */

      this.path = 'data:image/jpeg;base64,' + imageData;

      //////////////////////////////////////////////////////////////////////
      /* data['file_name'] = "test";
       data['file_data'] = " Korneliia ";
       data['file_size'] = imageData.length;
       data['file_part'] = "-1";*/
      /*this.api.postDefault('file', data).then(response => {
        console.log(response);

      }).catch(error => {
        console.log(error);
      })*/


    }, (err) => {
      console.log(err);

    }).finally(() => {
      this.cameraPreview.stopCamera();
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
      });
    await this.cameraPreview.show();
    this.displayView = true;
    setTimeout(() => {

      /*   this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
           this.path = 'data:image/jpeg;base64,' + imageData;
           this.cameraPreview.stopCamera();
         }, (err) => {
           console.log(err);
           this.cameraPreview.stopCamera();

         });*/

    }, 500);

    /*
        try {

          await Camera.checkPermissions().then((k: any) => {
            console.log(k)
            const image = Camera.getPhoto({
              quality: 85,
              allowEditing: false,
              promptLabelHeader: 'Wybór źródła zdjęcia',
              promptLabelCancel: 'Anuluj',
              promptLabelPhoto: 'Z galerii',
              promptLabelPicture: 'Zrób zdjęcie',
              height: 1000,
              width: 1000,
              resultType: CameraResultType.DataUrl,

            });
            console.log(image)
            image.then(data => {
              console.log(data)
              this.path = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + data.base64String);
            })*/
    /*

          async  image.then(data => {
              console.log("success");
              console.log(data);
              // this.path = data.path
              //  this.path = this.sanitizer.bypassSecurityTrustResourceUrl(data.path);
              this.path = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + data.base64String);
            }).catch(error => {
              console.log("error");
            });*/
    /* }).catch(data => {
       console.log(data)
     });
   } catch (error) {
     console.log(JSON.stringify(error));
   }*/

  }


}
