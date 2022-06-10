import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../_services/api.service';
import {LoginService} from "../_services/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router, private loginService: LoginService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.api.tokenExist()) {
      console.log('%cZnaleziono token', 'color: green');
      return true;
    } else {
      console.log('%cBrak tokenu- próba logowania', 'color: red');
      return new Promise((resolve, reject) => {
        this.loginService.checkStorage().then(data => {
          console.log('%cZalogowano automatycznie', 'color: green');
          resolve(true);
        }).catch(() => {
          console.log('%cBrak danych do logowania', 'color: red');
          this.router.navigate(['./login']);
          reject(false);
        });
      });
    }
 
    /*
    if(this._api.tokenExist()){
      return true;
    }else {
      this._router.navigate(['./login'])
      return false;
    }*/
  }

}
