import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../_services/footer.service";

@Component({
  selector: 'app-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss', '../settings.page.scss'],
})
export class InformationComponent implements OnInit {
  public modalPlaceIsOpen = false;

  constructor(public _footer: FooterService) {
  }

  open(): void {
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.modalPlaceIsOpen = true;
      this._footer.bannerIconDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);
  }

  ngOnInit() {

  }


}
