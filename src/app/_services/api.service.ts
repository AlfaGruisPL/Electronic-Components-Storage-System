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
      json['email']= email;
      json['password']=password;

      this._http.post('login',json,this.getHeader()).then(data=>{
          this.token=data['token'];
          resolve(true);
        }).catch(
        error=>{
         reject(false);
        });




    }));
  }


  public tokenExist():boolean{
    return this.token.length > 5
  }
  public clearToken():void{
    this.token="";
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
