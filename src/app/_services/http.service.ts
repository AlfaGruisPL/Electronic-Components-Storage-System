import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTP} from '@ionic-native/http/ngx';
import {Capacitor} from '@capacitor/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private adresApi = 'https://www.magazynapi.efennec.cfolks.pl/index.php/';


  constructor(private _http: HttpClient, private http: HTTP, public toastController: ToastController) {
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
        this.http.post(this.adresApi + url + '?data=' + encoded, {}, {}).then(k => {
          try {
            resolve(JSON.parse(k['data']));
          } catch (error) {
            reject(k);
          }
        }).catch(error => {
          //console.log(JSON.parse(error['error']))
          this.errorAnalize(error);
          try {
            reject(JSON.parse(error['error']));
          } catch (err) {
            console.log(error);
            reject(false);
          }
        });

      }
    }));
  }

  patch(url: string, body: any, options: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      if (Capacitor.isNativePlatform() == false) {
        this.patch_(this.adresApi + url, body, options).subscribe(next => {
            resolve(next);
          },
          error => {
            reject(error);
          });
      } else { //mobile
        var encoded = btoa(JSON.stringify(body));
        this.http.setServerTrustMode('nocheck');
        this.http.patch(this.adresApi + url + '?data=' + encoded, {}, {}).then(k => {
          try {
            resolve(JSON.parse(k['data']));
          } catch (error) {
            reject(k);
          }
        }).catch(error => {
          //console.log(JSON.parse(error['error']))
          this.errorAnalize(error);
          try {
            reject(JSON.parse(error['error']));
          } catch (err) {
            console.log(error);
            reject(false);
          }
        });

      }
    }));
  }

  delete(url: string, data: any, option = '') {
    return new Promise((resolve, reject) => {
      console.log(data)
      console.log(JSON.stringify(data))
      var encoded = btoa(JSON.stringify(data));
      console.log(encoded)
      this.http.delete(this.adresApi + url + '?data=' + encoded, {}, {}).then(k => {
        resolve(JSON.parse(k['data']));
      })
    });

  }


  get(url: string, options: any, token = '', timeout: number): Promise<any> {
    return new Promise(((resolve, reject) => {
      var data = {};
      data['token'] = token;
      var encoded = btoa(JSON.stringify(data));
      this.http.setServerTrustMode('nocheck');
      this.http.setRequestTimeout(timeout)
      this.http.get(this.adresApi + url + '?data=' + encoded, {}, {}).then(k => {
        try {
          resolve(JSON.parse(k['data']));
        } catch (error) {
          reject(k);
        }
      }).catch(error => {
        reject(this.errorAnalize(error));
        try {
          reject(JSON.parse(error['error']));
        } catch (err) {
          console.log(error);
          reject(false);
        }
      });
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
      }, 1);
    }
    return data;
  }

  private post_(url: string, body: any, options: any): Observable<any> {
    return this._http.post(url, body, options);
  }

  private patch_(url: string, body: any, options: any): Observable<any> {
    return this._http.patch(url, body, options);
  }


  private get_(url: string, options: any): Observable<any> {
    return this._http.get(url, options);
  }


}


