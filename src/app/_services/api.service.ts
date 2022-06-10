import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';
import {ApiResponse} from '../_modal/api-response';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private _http: HttpService, private http: HTTP, private _router: Router) {
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      const json = {};
      json['email'] = email;
      json['password'] = password;

      this._http.post('login', json, this.getHeader()).then(data => {
        this.token = data.token;
        resolve(true);
      }).catch(
        error => {
          if (error.status == '401') {
            this.clearToken();
            this._router.navigate(['']);
            alert('Wylogowanie automatyczne: ' + error.status);
          }
          reject(error);
        });


    }));
  }

  public getDefault(postfix: string): Promise<ApiResponse | any> {
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      this._http.get(postfix, this.getHeader(), this.token).then(next => {
        resolve(next);

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

  public postDefault(postfix: string, dane: any): Promise<ApiResponse | any> {
    dane['token'] = this.token;
    return new Promise<Array<ApiResponse>>((resolve, reject) => {
      this._http.post(postfix, dane, this.getHeader()).then(next => {
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

  public async clearToken() {
    const storage = await this.storage.create();
    this._storage = storage;
    this._storage.clear();
    this.token = '';
    this._router.navigate(['/login'])
    console.log(1)
  }

  private getHeader(): any {
    var httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
        token: this.token
      })
    };

    return httpOptions;
  }
}
