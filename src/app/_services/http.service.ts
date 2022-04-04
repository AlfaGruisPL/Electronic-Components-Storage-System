import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private adresApi = "https://magazynapi.efennec.cfolks.pl/index.php/";

  constructor(private _http: HttpClient) {
  }

  post(url: string, body: any, options: any): Observable<any> {
    return this._http.post(this.adresApi + url, body, options)
  }

  get(url: string, options: any): Observable<any> {
    return this._http.get(this.adresApi + url, options)
  }
}

 
