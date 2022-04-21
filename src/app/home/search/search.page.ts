import {Component, OnInit} from '@angular/core';
import {FooterService} from "../../_services/footer.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(public _footer: FooterService,) {
  }

  ngOnInit() {
  }

}
