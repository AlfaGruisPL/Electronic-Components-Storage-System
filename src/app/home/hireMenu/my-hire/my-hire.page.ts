import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";
import {ApiService} from "../../../_services/api.service";
import {Hire} from "../../../_modal/hire";
import {ApiResponse} from "../../../_modal/api-response";

@Component({
  selector: 'app-my-hire',
  templateUrl: './my-hire.page.html',
  styleUrls: ['./my-hire.page.scss'],
})
export class MyHirePage implements OnInit {
  public hireList: Array<Hire> = [];

  constructor(public _footer: FooterService, private _api: ApiService) {
  }

  ngOnInit() {
    this._api.getDefault('wyporzyczeniaUzytkownika').then((data: ApiResponse) => {
      const dataList: Array<Hire> = data.value;
      dataList.forEach(hire => {
        const hireTmp = new Hire();
        Object.assign(hireTmp, hire);
        this.hireList.push(hireTmp);
      })
      this.hireList = this.hireList.sort((k1: Hire, k2: Hire) => {
        return k1.timeToReturn() < k2.timeToReturn() ? -1 : 1;
        return 0;
      });
    })
  }
}
