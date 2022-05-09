import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../_modal/api-response';
import {ElementClass} from '../_modal/element';
import {Miejsce} from '../_modal/miejsce';
import {QrOut} from '../_modal/qr-out';
import {ApiService} from '../_services/api.service';
import {FooterService} from '../_services/footer.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  public mode: string = "wait";
  public element: ElementClass;
  public modalPlaceIsOpen = false;
  public miejsca: Array<Miejsce> = [];
  public displayDescription = false;

  //public miejsce:Miejsce = undefined;
  constructor(private route: ActivatedRoute, private _router: Router, public _api: ApiService, public _footer: FooterService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: QrOut) => {
        if (params.text.charAt(0).toUpperCase() == "K" && params.text.charAt(1) == "_") {

          this.mode = "element"
          this._api.getDefault("elementInfo/" + params.text.split("_")[1]).then(data => {
            this.element = data['value'][0];
          })
        } else if (params.text.charAt(0).toUpperCase() == "&" && params.text.charAt(1) == "_") {
          this.mode = "miejsca"
          this.getMiejsce(params.text.split("_")[1]);

        } else {
          this.mode = "nieZnane"
        }

      }
    );
  }

  openModalLocalization(id: number): void {
    this._api.getDefault('lokalizacja/' + id).then((data: ApiResponse) => {
      // if (data.value[0]['id'].length() > 0) {
      this.openModalPlace(data.value[0]['id']);
      //} else {
      //   alert("Nie znaleziono lokalizacji");
      //  }
    });
  }


  openModalPlace(id: number | string): void {
    this.miejsca = [];
    this.modalPlaceIsOpen = !this.modalPlaceIsOpen;
    this.getMiejsce(id);
  }

  private getMiejsce(id: number | string): void {
    this._api.getDefault('miejsce/' + id).then((data: ApiResponse) => {
      // @ts-ignore
      var value = Array<Miejsce>(data.value);
      value[0].forEach(miej => {
        var miejscaTMP = new Miejsce(miej.id, miej.id_rodzica, miej.id_zdjecia, miej.nazwa);
        this.miejsca.push(miejscaTMP);
      })

    })
  }
}
