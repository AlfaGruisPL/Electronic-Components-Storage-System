import {Component, OnInit} from '@angular/core';
import {HireService} from "../../../../_services/hire.service";
import {FooterService} from "../../../../_services/footer.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../../_services/api.service";
import {HttpService} from "../../../../_services/http.service";

@Component({
  selector: 'app-my-hire-information',
  templateUrl: './my-hire-information.page.html',
  styleUrls: ['./my-hire-information.page.scss'],
})
export class MyHireInformationPage implements OnInit {
  public modalPlaceIsOpen2 = false;
  public modalTitle = '';
  public modalID = 0;

  constructor(public hireService: HireService, public _footer: FooterService, public _api: ApiService,
              public http: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  openModalPlace(id: number | string, title: string): void {
    this.modalTitle = title;
    this.modalID = Number(id);
    this.modalPlaceIsOpen2 = true;
    this._footer.bannerIconDisplay = false;
    this._footer.backObserver(true).then(k => {
      this.modalPlaceIsOpen2 = k;
    });
  }


  returnHire(): void {
    // this.modalPlaceIsOpen = false;
    setTimeout(() => {

      this.router.navigate(['../hire/return-hire']);
    }, 10);
  }

}
