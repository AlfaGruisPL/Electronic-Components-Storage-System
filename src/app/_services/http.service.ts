import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HTTP} from '@ionic-native/http/ngx';
import {Capacitor} from '@capacitor/core';
import {Network} from '@awesome-cordova-plugins/network/ngx';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private adresApi = 'https://www.magazynapi.efennec.cfolks.pl/index.php/';


  constructor(private _http: HttpClient, private http: HTTP, private network: Network, public toastController: ToastController) {
  }

  post(url: string, body: any, options: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      if (Capacitor.isNativePlatform() == false) {
        this.post_(this.adresApi + url, body, options).subscribe(next => {
            resolve(next);
          },
          error => {
            reject(error);
          });
      } else { //mobile
        var encoded = btoa(JSON.stringify(body));
        this.http.setServerTrustMode('nocheck');
        this.http.post(this.adresApi + url + '?data=' + encoded, {}, {}).then(a => {
          resolve(JSON.parse(a['data']));
        }).catch(b => {
          reject(this.errorAnalize(b));
        });

      }
    }));
  }

  get(url: string, options: any, token = ''): Promise<any> {
    return new Promise(((resolve, reject) => {
      if (Capacitor.isNativePlatform() == false) { //mobile
        this.get_(this.adresApi + url, options).subscribe(next => {
            resolve(next)
          },
          error => {
            reject(error);
          });
      } else {
        var data = {};
        data['token'] = token;
        var encoded = btoa(JSON.stringify(data));
        this.http.setServerTrustMode('nocheck');
        this.http.get(this.adresApi + url + '?data=' + encoded, {}, {}).then(a => {
          resolve(JSON.parse(a['data']));
        }).catch(b => {
          alert(JSON.stringify(b));
          reject(this.errorAnalize(b));
        });

      }
    }));
  }

  errorAnalize(data: any): any {
    if (data['status'] == "-6") {
      setTimeout(async () => {
        const toast = await this.toastController.create({
          message: 'Brak połączenia z internetem',
          duration: 4000
        });
        toast.present();
      }, 1)

    }
    return data;

  }

  private post_(url: string, body: any, options: any): Observable<any> {
    return this._http.post(url, body, options)
  }

  private get_(url: string, options: any): Observable<any> {
    return this._http.get(url, options);
  }


}


