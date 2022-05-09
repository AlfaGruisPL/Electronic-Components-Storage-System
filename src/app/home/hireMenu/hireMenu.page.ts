import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../_services/footer.service';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HireMenuPage implements OnInit {

  constructor(public _footer: FooterService) {
  }

  ngOnInit() {
  }

}
