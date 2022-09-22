import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ElementClass} from '../_modal/element';
import {ApiService} from '../_services/api.service';
import {FooterService} from '../_services/footer.service';
import {Miejsce} from "../_modal/miejsce";
import {ApiResponse} from "../_modal/api-response";
import {LoadingService} from "../_services/loading.service";
import {ApiEndPoint} from "../_modal/api-end-point";
import {QrOut} from "../_modal/qr-out";
import {Page} from "../_modal/page";
import {Platform} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  public mode = 'wait';
  public element: ElementClass = new ElementClass();
  public modalPlaceIsOpen = false;
  public miejsceId: any;
  public displayDescription = false;
  public modalTitle = '';
  public modalID = 0;
  public miejsca: Array<Miejsce> = [];
  private sub: Subscription;

  constructor(private route: ActivatedRoute,
              private _router: Router,
              public _api: ApiService,
              public _footer: FooterService,
              private loading: LoadingService,
              private platform: Platform) {
  }

  ionViewDidEnter() {
    this._footer.footerSetPage.next(Page.page);
  }

  ngOnInit() {

    this.loading.create();
    this.route.params.subscribe(
      (params: QrOut) => {
        if (params.text.split(':')[0] === 'element') {
          this.mode = 'element';
          this._api.getDefault(ApiEndPoint.elementInfo + '/' + params.text.split(':')[1]).then(data => {
            Object.assign(this.element, data.value[0]);
            this.loading.dismiss();
          });
        } else if (params.text.split(':')[0] === 'miejsce') {
          this.mode = 'miejsca';
          this.miejsceId = params.text.split(':')[1];
          this.getMiejsce(this.miejsceId);
        } else {
          this.mode = 'nieZnane';
        }
      }
    );
  }


  openModalPlace(id: number | string, title: string): void {
    this.modalTitle = title;
    this.modalID = Number(id);
    this.modalPlaceIsOpen = true;
    this._footer.bannerIconDisplay = false;
    this._footer.backObserver(true).then(k => {
      this.modalPlaceIsOpen = k;

    });
  }

  private getMiejsce(id: number | string): void {
    this._api.getDefault('miejsce/' + id).then((data: ApiResponse) => {
      // @ts-ignore
      const value = Array<Miejsce>(data.value);
      value[0].forEach(miej => {
        const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
        this.miejsca.push(miejscaTMP);
      });
      this.loading.dismiss();
    });
  }
}
