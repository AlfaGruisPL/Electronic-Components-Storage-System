import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {QrcodeService} from './qrcode.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private _router: Router, private _qr: QrcodeService) {
  }

  getInfo(): void {
    this._qr.getInfo().then(data => {
      this._router.navigate(["/information/" + data.text.toString() + "/" + data.format.toString()])
    });
  }

  getRegisterPage(): void {

  }

  ToLogin(): void {

  }

  ToMenu(): void {

  }

  tologOut(): void {

  }
}
