import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { HTTP } from '@ionic-native/http/ngx';
import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private adresApi = "https://magazynapi.efennec.cfolks.pl/index.php/";

  constructor(private _http: HttpClient,private http:HTTP) {
  }

 private post_(url: string, body: any, options: any): Observable<any> {
    return this._http.post(url, body, options)
  }

 private get_(url: string, options: any): Observable<any> {
    return this._http.get(url, options)
  }
  post(url:string,body: any, options: any):Promise<any>{
    return new Promise(((resolve, reject) => {
     // if(Capacitor.isNativePlatform() == false) //browser
        this.post_(this.adresApi+url,body,options).subscribe(next=>{
          console.log(next)
        resolve(next)
          },
          error=>{     console.log(error)
            reject(error);
          });
    /*  if(Capacitor.isNativePlatform() == true) // mobile
        this.http.post(this.adresApi+url,body,options).then(data=>{
          resolve(data)
        }).catch(data=>{
          reject(data);
        })
*/
    }))
  }
}


