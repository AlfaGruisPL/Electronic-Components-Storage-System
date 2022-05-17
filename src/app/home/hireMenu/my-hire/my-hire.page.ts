import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";

@Component({
  selector: 'app-my-hire',
  templateUrl: './my-hire.page.html',
  styleUrls: ['./my-hire.page.scss'],
})
export class MyHirePage implements OnInit {

  constructor(public _footer: FooterService) {
  }

  ngOnInit() {
  }

}
