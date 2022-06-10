import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {LoginService} from "./_services/login.service";

const {SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {
  }

  componentDidLoad() {
    SplashScreen.hide(); //niby przyśpiesza ładowanie

  }


  async ngOnInit() {
    //console.log('Hej')
    this.loginService.checkStorage().then(() => {
    }).catch(() => {
    })

  }
}
