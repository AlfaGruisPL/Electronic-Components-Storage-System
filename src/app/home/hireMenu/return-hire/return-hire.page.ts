import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {Hire} from "../../../_modal/hire";
import {ApiResponse} from "../../../_modal/api-response";
import {ElementClass} from "../../../_modal/element";

@Component({
  selector: 'app-return-hire',
  templateUrl: './return-hire.page.html',
  styleUrls: ['./return-hire.page.scss'],
})
export class ReturnHirePage implements OnInit {
  public hire: Hire = new Hire();
  public state = 0;

  public element: ElementClass = new ElementClass();
  public elementId: number = 0;

  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.state = 1;
      this.element.nazwa = params.get('nazwa');
      this.api.getDefault('wyporzyczenieUzytkownika/' + params.get('id')).then((hire: ApiResponse) => {
        Object.assign(this.hire, hire.value[0]);
        this.elementId = this.hire.id_elementu;

      });
    });
  }

  scanPlace() {
    this.state = 2;
  }

  scanElement() {
    this.getElementInformation();
    this.state = 1;
  }

  getElementInformation() {
    this.api.getDefault('elementInfo/' + this.elementId).then(data => {
      this.element = data.value[0];
    });
  }
}
