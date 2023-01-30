import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';
import {ApiResponse} from '../_modal/api-response';
import {HttpHeaders} from '@angular/common/http';
import {ApiEndPoint} from '../_modal/api-end-point';
import {Login} from '../_modal/login';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public timeArray: Array<number> = [];
  private token = '';
  private isAdminVal = false;
  private _storage: Storage | null = null;

  constructor(private storage: Storage,
              private _http: HttpService,
              private http: HTTP,
              private _router: Router,
              private toastController: ToastController) {
  }

  isAdmin(): boolean {
    return this.isAdminVal;
  }

  login(email: string, password: string, firebaseToken, saveToLocalStorage: boolean): Promise<Login> {

    return new Promise<Login>(((resolve, reject) => {
      const json = {};
      json['email'] = email;
      // json['id'] = this.deviseID;
      json['password'] = password;
      if (saveToLocalStorage) {
        json['firebaseToken'] = firebaseToken;

      }
      this._http.post('login', json, this.getHeader()).then((data: Login) => {
        const find = data.group.find(group => group.group_id === '2');
        this.isAdminVal = find !== undefined;
        //  this.isAdminVal = data.isAdmin === 1;
        this.token = data.token;
        resolve(data);
      }).catch(
        error => {
          console.log(error)
          if (error.status == '401') {
            this.clearToken();
            this._router.navigate(['']);
            alert('Wylogowanie automatyczne: ' + error.status);
          }
          reject(error);
        });


    }));
  }

  public getDefault(postfix: string | ApiEndPoint, timeout: number = 60): Promise<ApiResponse | any> {
    const time1 = new Date().getTime();
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      this._http.get(postfix, this.getHeader(), this.token, timeout).then(next => {
        resolve(next);
        this.timeArray.push(new Date().getTime() - time1);
      }).catch(error => {
        if (error.status === 401) {

          console.log(error);
          this.clearToken();
          this._router.navigate(['']);
          alert('Wylogowanie automatyczne: ' + error.status);
        }
        reject(error);
      });
    });
  }

  public delete(postfix: string, daneParametr: any): Promise<ApiResponse | any> {
    const dane = {};
    const time1 = new Date().getTime();
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      if (this.token.length > 10) {
        dane['token'] = this.token;
      }
      this._http.delete(postfix, dane, this.getHeader()).then(next => {
        // @ts-ignore
        resolve(next);
        this.timeArray.push(new Date().getTime() - time1);
      }).catch(error => {
        if (error.status === '401') {
          this.clearToken();
          this._router.navigate(['']);
          alert('Wylogowanie automatyczne: ' + error.status);
        }
        reject(error);
      });
    });
  }

  public postDefault(postfix: string, dane: any): Promise<ApiResponse | any> {
    if (this.token.length > 10) {
      dane['token'] = this.token;
    }
    const time1 = new Date().getTime();
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      this._http.post(postfix, dane, this.getHeader()).then(next => {
        resolve(next);
        this.timeArray.push(new Date().getTime() - time1);
      }).catch(error => {
        if (error.status === '401') {
          this.clearToken();
          this._router.navigate(['']);
          alert('Wylogowanie automatyczne: ' + error.status);
        }

        reject(error);
      });
    });
  }

  public patchDefault(postfix: string, dane: any): Promise<ApiResponse | any> {
    if (this.token.length > 10) {
      dane['token'] = this.token;
    }
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      this._http.patch(postfix, dane, this.getHeader()).then(next => {
        resolve(next);

      }).catch(error => {
        if (error.status === '401') {
          this.clearToken();
          this._router.navigate(['']);
          alert('Wylogowanie automatyczne: ' + error.status);
        }

        reject(error);
      });
    });
  }

  public tokenExist(): boolean {
    return this.token.length > 5;
  }

//todo zmienic nazwę i dać do login service
  public async clearToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getDefault('logout').then(async k => {
        const toast = await this.toastController.create({
          message: 'Wylogowanie udane',
          duration: 2000,
          icon: 'key-outline',
          position: 'top',
          cssClass: 'betterToast',
          buttons: [
            {
              text: 'Schowaj',
              role: 'cancel'
            }
          ],
        });
        toast.present();
        const storage = await this.storage.create();
        this._storage = storage;
        this._storage.clear();
        this.token = '';
        this.isAdminVal = false;
        resolve(true)
        this._router.navigate(['/login'])
      }).catch(async error => {
        const toast = await this.toastController.create({
          message: 'Wylogowanie nie udane',
          duration: 2000,
          icon: 'key-outline',
          position: 'top',
          cssClass: 'betterToast',
          buttons: [
            {
              text: 'Schowaj',
              role: 'cancel'
            }
          ],
        });
        reject(false);
        toast.present();
      })
    })
  }


  private getHeader(): any {

    // @ts-ignore
    var httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
        token: this.token.length > 10 ? this.token : ""
      })
    };

    return httpOptions;
  }
}
