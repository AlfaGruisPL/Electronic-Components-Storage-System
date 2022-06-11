import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../_services/api.service';
import {LoginService} from '../_services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private i = 0;

  constructor(private api: ApiService, private router: Router, private loginService: LoginService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // sprawdzenie, czy aplikacja jest już zalogowana do API
    if (this.api.tokenExist()) {
      if (this.i === 0) {
        console.log('%cUżytkownik zalogowany', 'color: green');
        this.i = 2;
      }
      return true;
    } else {
      console.log('%cBrak tokenu- próba logowania', 'color: green');
      return new Promise((resolve, reject) => {
        this.loginService.checkStorage().then(data => {
          console.log('%cZalogowano automatycznie', 'color: green');
          resolve(true);
        }).catch(() => {
          console.log('%cBrak danych do logowania', 'color: green');
          this.router.navigate(['./login']);
          reject(false);
        });
      });
    }
  }

}
