import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../_services/footer.service';
import {Router} from "@angular/router";
import {Page} from "../../_modal/page";

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HireMenuPage implements OnInit {

  constructor(public _footer: FooterService, private router: Router) {
  }

  ngOnInit() {

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
