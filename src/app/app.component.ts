import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';

const {SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
  }

  componentDidLoad() {
    SplashScreen.hide(); //niby przyśpiesza ładowanie

  }


  ngOnInit() {

  }
}
