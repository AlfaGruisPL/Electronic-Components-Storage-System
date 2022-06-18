import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {QrcodeService} from './qrcode.service';
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private _router: Router, private _qr: QrcodeService, private location: Location) {
  }

  getInfo(): void {
    this._qr.getInfo().then(data => {
      this._router.navigate(["/information/" + data.text.toString() + "/" + data.format.toString()])
    });
  }

  getRegisterPage(): void {
    this._router.navigate(['/register']);
  }

  ToLogin(): void {
    this._router.navigate(['/login']);
  }

  ToMenu(): void {
    this._router.navigate(['/home']);
  }

  tologOut(): void {
  }

  back(): void {
    this.location.back();
  }
}
