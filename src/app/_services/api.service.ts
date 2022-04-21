import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ApiResponse } from '../_modal/api-response';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token:string = "";
  private _storage: Storage | null = null;
  constructor(private storage: Storage,private _http: HttpService,private http:HTTP,private _router:Router) { }

  login(email:string,password:string):Promise<boolean>{
    return new Promise<boolean>(((resolve, reject) => {
      var json = {};
      json['email']= email;
      json['password']=password;

      this._http.post('login',json,this.getHeader()).then(data=>{
          this.token=data['token'];
          resolve(true);
        }).catch(
        error=>{
          if(error['status']=="401"){
            this.clearToken();
            this._router.navigate([''])
            alert("Wylogowanie automatyczne: "+error['status'])
          }
          reject(error);
        });




    }));
  }
  public getDefault(postfix: string): Promise<ApiResponse|any> {
    return new Promise<Array<any>>((resolve, reject) => {
      var Tstart = new Date().getTime();
      this._http.get(postfix, this.getHeader()).then(next=>{
      resolve(next)
      }).catch(error=>{
        if(error['status']=="401"){
          this.clearToken();
          this._router.navigate([''])
          alert("Wylogowanie automatyczne: "+error['status'])
        }
        reject(error);
      });
    });
  }

  public tokenExist():boolean{
    return this.token.length > 5
  }
  public async clearToken() {
    const storage = await this.storage.create();
    this._storage = storage;
    this._storage.clear()
    this.token = "";
  }
  private getHeader():any{
    let httpOptions = {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'token': this.token
    };
    return httpOptions;
  }
}
