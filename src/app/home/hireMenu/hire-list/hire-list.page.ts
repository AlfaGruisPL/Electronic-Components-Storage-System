import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";
import {ApiService} from "../../../_services/api.service";
import {Hire} from "../../../_modal/hire";
import {ApiResponse} from "../../../_modal/api-response";

@Component({
  selector: 'app-hire-list',
  templateUrl: './hire-list.page.html',
  styleUrls: ['./hire-list.page.scss'],
})
export class HireListPage implements OnInit {
  public hireList: Array<Hire> = [];
  public modalPlaceIsOpen = false;
  public selectedHireInModal: Hire = new Hire();

  constructor(public _footer: FooterService, private _api: ApiService) {
  }

  ngOnInit() {
    this._api.getDefault('wyporzyczeniaUzytkownikaHistoria').then((data: ApiResponse) => {
      const dataList: Array<Hire> = data.value;
      dataList.forEach(hire => {
        const hireTmp = new Hire();
        Object.assign(hireTmp, hire);
        this.hireList.push(hireTmp);
      });
    });
  }

  openModal(selected: Hire) {
    this.selectedHireInModal = selected;
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.modalPlaceIsOpen = true;
    }, 10);

  }
}
