import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  sendCompleate: BehaviorSubject<boolean> = new BehaviorSubject(false);
  sendInfo: BehaviorSubject<number> = new BehaviorSubject(0);
  private sendResponse = 0;
  private time = 0;

  constructor(private api: ApiService,) {
  }


  sendImage(file: string, name: string): Promise<number> {
    this.sendCompleate.next(false)
    this.sendInfo.next(0)
    this.time = new Date().getTime();
    const cut = 5500;
    const max = Math.round(file.length / cut);
    this.sendPart(max, 0, file, cut, name);

    return new Promise<number>((resolve) => {
      const sub = this.sendCompleate.subscribe(k => {
        if (k) {
          sub.unsubscribe();
          resolve(this.sendResponse);
        }
      });
    });
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
  }

  private sendPart(max: number, i: number, image: string, cut, name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const data = {};
      data['file_name'] = name;
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

      try {
        var response = await this.api.postDefault('image', data)
        console.log(response)
      } catch (error) {
        console.log(error)
        return;
      }
      //  console.log(response);
      this.sendInfo.next(i / max);
      if (part !== ')') {
        this.sendPart(max, i + 1, image, cut, name);
      } else {
        this.sendResponse = response['id'];
        this.sendInfo.next(1);
        this.sendCompleate.next(true);
      }
      resolve(true);

    });
  }

}
