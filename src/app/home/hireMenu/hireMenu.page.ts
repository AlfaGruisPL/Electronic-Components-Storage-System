import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../_services/footer.service';
import {Router} from "@angular/router";
import {Page} from "../../_modal/page";
import {ApiResponse} from "../../_modal/api-response";
import {Hire} from "../../_modal/hire";
import {ApiService} from "../../_services/api.service";
import {HireStats} from "../../_modal/hire-stats";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HireMenuPage implements OnInit {
  hireStat: HireStats = new HireStats();

  constructor(public _footer: FooterService, private router: Router, private _api: ApiService) {
  }

  ngOnInit() {
    var k = setInterval(() => {
      const menu = document.getElementById("menuButton").clientHeight;
      if (menu > 100) {
        const container = document.getElementById('container').clientHeight;
        const info = document.getElementById("info").style.height = (container - menu - 50) + 'px';
        clearInterval(k)
      }
      console.log(1)
    }, 10);
    this.getData();
    this._api.getDefault('wypozyczeniaStats').then((data: ApiResponse) => {
      console.log(data)
      Object.assign(this.hireStat, data.value);
    })
  }


  public hireList: Array<Hire> = [];

  getData(): Promise<any> {
    return new Promise<any>((resolve) => {
      this._api.getDefault('wypozyczeniaUzytkownikaAktywne').then((data: ApiResponse) => {
        const tempHireList = [];
        const dataList: Array<Hire> = data.value;
        dataList.forEach(hire => {
          const hireTmp = new Hire();
          Object.assign(hireTmp, hire);
          tempHireList.push(hireTmp);
        });
        if (JSON.stringify(this.hireList) !== JSON.stringify(tempHireList)) {
          this.hireList = tempHireList;
        }
        this.hireList = this.hireList.sort((k1: Hire, k2: Hire) => {
          return k1.timeToReturn() < k2.timeToReturn() ? -1 : 1;
          return 0;
        });
        resolve(true);
      });
    });
  }


  ionViewDidEnter() {
    this._footer.footerSetPage.next(Page.nextHome);
  }

  returnHire() {
    this._footer.footerSetPage.next(Page.page);
    this.router.navigate(['../hire/return-hire']);
  }

  toHire(): void {
    this._footer.footerSetPage.next(Page.page);
    this.router.navigate(['/hire/hire']);
  }

  toHireList(): void {
    this._footer.footerSetPage.next(Page.page);
    this.router.navigate(['/hire/hire-list']);
  }

  toMyHire(): void {
    this._footer.footerSetPage.next(Page.page);
    this.router.navigate(['/hire/my-hire']);
  }


}
