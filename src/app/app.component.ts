import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  ngOnInit() {
  }
}
