import {Component, Input, OnInit} from '@angular/core';
import {ApiResponse} from '../../_modal/api-response';
import {Miejsce} from '../../_modal/miejsce';
import {ApiService} from '../../_services/api.service';
import {ElementClass} from '../../_modal/element';
import {ElementsService} from "../../_services/elements.service";


@Component({
  selector: 'app-element-in-place-info',
  templateUrl: './element-in-place-info.component.html',
  styleUrls: ['./element-in-place-info.component.scss'],
})
export class ElementInPlaceInfoComponent implements OnInit {
  @Input() set setElement(val: ElementClass | undefined) {
    try {
      console.log('Id to = ' + val.id);
      this.element = val;
      console.log(val)
      this._api.getDefault('miejsce/' + this.element.id_lokalizacji).then((data: ApiResponse) => {
        // @ts-ignore
        const value = Array<Miejsce>(data.value);
        value[0].forEach(miej => {
          const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
          this.miejsca.push(miejscaTMP);
        });
      })
    } catch (k) {
    }
  }

  @Input() mode = 'miejsce';//element
  @Input() title = 'Lokalizacja miejsca2';
  @Input() modalPlaceIsOpen = false;
  public idMiejscaVal: any;
  public miejsca: Array<Miejsce> = [];
  public element: ElementClass;

  constructor(private _api: ApiService, public elementService: ElementsService) {
  }

  open() {
    this.modalPlaceIsOpen = true;
  }

  @Input() set idMiejsca(value: any) {
    this._api.getDefault('miejsce/' + value).then((data: ApiResponse) => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const value = Array<Miejsce>(data.value);
      value[0].forEach(miej => {
        const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
        this.miejsca.push(miejscaTMP);
      });
    });
  }


  ngOnInit() {
//
  }

  private getMiejsce(id: number | string): void {
    this._api.getDefault('miejsce/' + id).then((data: ApiResponse) => {
      // @ts-ignore
      const value = Array<Miejsce>(data.value);
      value[0].forEach(miej => {
        const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
        // this.miejsca.push(miejscaTMP);
      });
    });
  }
}
