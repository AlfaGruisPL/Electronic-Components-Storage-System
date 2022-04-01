import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  badPassword=false;
  badLogin = false;
  constructor(private _router:Router) { }

  ngOnInit() {
  }
  login(){
    setTimeout(()=>{
      this._router.navigate(["home"])
    },1000)
this.badLogin= true;
this.badPassword=true;
  }
}
