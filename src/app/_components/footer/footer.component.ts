import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../_services/footer.service";
import {Page} from "../../_modal/page";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Page = Page;

  constructor(public footer: FooterService) {
  }

  ngOnInit() {
  }

}
