import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";

@Component({
  selector: 'app-hire-list',
  templateUrl: './hire-list.page.html',
  styleUrls: ['./hire-list.page.scss'],
})
export class HireListPage implements OnInit {

  constructor(public _footer: FooterService) {
  }

  ngOnInit() {
  }

}
