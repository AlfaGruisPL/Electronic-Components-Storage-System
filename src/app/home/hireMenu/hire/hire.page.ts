import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../_services/footer.service';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {

  customPopoverOptions: any = {
    header: 'Wybierz czas wypożyczenia',
    //subHeader: 'Select your hair color',
    message: 'W przypadku nie oddania na czas, istnieje możliwości przydłużenia wypożyczenia'
  };

  constructor(public _footer: FooterService) {
  }

  ngOnInit() {
  }

  scanElement(): void {

  }
}
