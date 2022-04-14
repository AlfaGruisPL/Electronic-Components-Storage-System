import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { ApiService } from '../_services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private _api: ApiService, private _router:Router) {}

public  logOut():void{
    this._api.clearToken();
    this._router.navigate(['/'])
}
}
