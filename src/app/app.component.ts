import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core'

const { SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  componentDidLoad(){
    SplashScreen.hide(); //niby przyśpiesza ładowanie
  }

  constructor() {
  }
  async ngOnInit() {


  }
}
