import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../../_services/footer.service";
import {ApiService} from "../../../_services/api.service";
import {Hire} from "../../../_modal/hire";
import {ApiResponse} from "../../../_modal/api-response";
import {LoadingService} from "../../../_services/loading.service";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-hire-list',
  templateUrl: './hire-list.page.html',
  styleUrls: ['./hire-list.page.scss'],
})
export class HireListPage implements OnInit {
  public cp = 1;
  public hireList: Array<Hire> = [];
  public modalPlaceIsOpen = false;
  public selectedHireInModal: Hire = new Hire();
  private sub: Subscription;

  constructor(public _footer: FooterService,
              private _api: ApiService,
              private platform: Platform,
              public loading: LoadingService) {
  }

  private getDataInterval: any;


  ionViewDidLeave() {
    clearInterval(this.getDataInterval);
  }

  ngOnInit() {
    this.loading.create();
    this.getData();
    this.getDataInterval = setInterval(() => this.getData(), 5000)


  }

  getData(): Promise<any> {
    return new Promise<any>((resolve) => {

      this._api.getDefault('wypozyczeniaUzytkownikaHistoria').then((data: ApiResponse) => {
        const dataList: Array<Hire> = data.value;
        const tempHireList = [];
        dataList.forEach(hire => {
          const hireTmp = new Hire();
          Object.assign(hireTmp, hire);
          tempHireList.push(hireTmp);

        });
        if (JSON.stringify(this.hireList) !== JSON.stringify(tempHireList)) {
          this.hireList = tempHireList;
        }

        resolve(true);
        this.loading.dismiss();
      }).catch(error => {
        console.error("Api: wypozyczeniaUzytkownikaHistoria ", error)
        return (false);
      });
    })
  }


  ionViewWillLeave() {
  }


  openModal(selected: Hire) {
    this.selectedHireInModal = selected;
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.modalPlaceIsOpen = true;
      this._footer.bannerIconDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);

  }


  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getData()
    event.target.complete();
  }
}
