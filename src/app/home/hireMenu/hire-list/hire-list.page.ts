import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";
import {ApiService} from "../../../_services/api.service";

@Component({
  selector: 'app-hire-list',
  templateUrl: './hire-list.page.html',
  styleUrls: ['./hire-list.page.scss'],
})
export class HireListPage implements OnInit {

  constructor(public _footer: FooterService, private _api: ApiService) {
  }

  ngOnInit() {
    this._api.getDefault('wyporzyczeniaUzytkownika').then(data => {
      console.log(data)
    })
  }

}
