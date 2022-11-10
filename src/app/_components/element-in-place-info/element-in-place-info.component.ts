import {Component, Input, OnInit} from '@angular/core';
import {ApiResponse} from '../../_modal/api-response';
import {Miejsce} from '../../_modal/miejsce';
import {ApiService} from '../../_services/api.service';
import {ElementsService} from '../../_services/elements.service';
import {ApiEndPoint} from '../../_modal/api-end-point';
import {FooterService} from "../../_services/footer.service";


@Component({
  selector: 'app-element-in-place-info',
  templateUrl: './element-in-place-info.component.html',
  styleUrls: ['./element-in-place-info.component.scss'],
})
export class ElementInPlaceInfoComponent implements OnInit {
  @Input() set setData(id: number | undefined) {
    try {
      if (id != null) {
        this._api.getDefault(ApiEndPoint.miejsce + id).then((data: ApiResponse) => {
          this.miejsca = [];
          console.log(data.value);
          // @ts-ignore
          const value = Array<Miejsce>(data.value);
          value[0].forEach(miej => {
            const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
            this.miejsca.push(miejscaTMP);
          });
        });
      }
    } catch (k) {
    }
  }

  @Input() mode = 'miejsce';//element
  @Input() title = 'Lokalizacja miejsca2';
  @Input() elementName = 'bubu';
  @Input() modalPlaceIsOpen = false;
  public idMiejscaVal: any;
  public miejsca: Array<Miejsce> = [];

  constructor(private _api: ApiService, public elementService: ElementsService, public _footer: FooterService) {
  }

  open() {


    //this.modalPlaceIsOpen = true;
  }

  /*
    @Input() set setPlace(id: any) {
      if (id != null) {
        this._api.getDefault(ApiEndPoint.miejsce + '/' + id).then((data: ApiResponse) => {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const value = Array<Miejsce>(data.value);
          value[0].forEach(miej => {
            const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
            this.miejsca.push(miejscaTMP);
          });
        });
      }
    }
  */

  ngOnInit() {
  }

  /*
    private getMiejsce(id: number | string): void {
      this._api.getDefault('miejsce/' + id).then((data: ApiResponse) => {
        // @ts-ignore
        const value = Array<Miejsce>(data.value);
        value[0].forEach(miej => {
          const miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
          // this.miejsca.push(miejscaTMP);
        });
      });
    }*/
}
