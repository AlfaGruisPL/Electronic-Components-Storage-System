import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss', '../settings.page.scss'],
})
export class InformationComponent implements OnInit {
  public modalIsOpen = false;

  constructor() {
  }

  open(): void {
    this.modalIsOpen = false;
    setTimeout(() => {
      this.modalIsOpen = true;
    }, 10);
  }

  ngOnInit() {

  }


}
