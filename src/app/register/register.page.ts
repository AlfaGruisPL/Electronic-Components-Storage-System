import {Component, OnInit} from '@angular/core';
import {FooterService} from "../_services/footer.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public _footer: FooterService,) {
  }

  ngOnInit() {
  }

}

