import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../_services/footer.service';
import {Router} from "@angular/router";

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

  toHire(): void {
    this.router.navigate(['/hire/hire']);
  }

  toHireList(): void {
    this.router.navigate(['/hire/hire-list']);
  }

  toMyHire(): void {
    this.router.navigate(['/hire/my-hire']);
  }


}
