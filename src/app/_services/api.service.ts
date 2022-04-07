import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token:string = "";
  constructor(private _http: HttpService,private http:HTTP) { }

  login(email:string,password:string):Promise<boolean>{
    return new Promise<boolean>(((resolve, reject) => {
      var json = {};
      json['email']= "admin";
      json['password']="123456";
      this.http.setServerTrustMode('nocheck')
      this._http.post('login',json,this.getHeader()).then(
        next=>{
          this.token=next['token'];
          alert(123)
          resolve(true);
        }).catch(
        error=>{
          alert("nie")
          alert(error)
         alert(JSON.stringify(error))
reject(false);
        }
      )



    }));
  }



  private getHeader():any{
    let httpOptions = {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      'Content-Type': 'application/json',
        //'token': this.token
    };
    return httpOptions;
  }
}
