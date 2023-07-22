import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ElementClass} from 'src/app/_modal/element';
import {Miejsce} from 'src/app/_modal/miejsce';
import {ElementsService} from 'src/app/_services/elements.service';
import {PlacesService} from 'src/app/_services/places.service';
import {FooterService} from '../../_services/footer.service';
import {LoadingService} from '../../_services/loading.service';
import {Page} from '../../_modal/page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public findList: Array<ElementClass> = [];
  public findListPlace: Array<Miejsce> = [];
  public displayElements = true;
  public displayPlaces = false;
  public searchInput = '';
  public selectedType = 'elementy';
  placeSelectedFiler = 'dostepne';
  elementSelectedFiler = 'dostepne';
  elementSelectedFiler2 = 'sprawne';

  constructor(public _footer: FooterService, public _elements: ElementsService, private _router: Router, public _places: PlacesService,
              public loading: LoadingService) {
  }

  ionViewDidEnter() {
    this._footer.footerSetPage.next(Page.nextHome);
  }

  async ngOnInit() {
    await this.loading.create();
    this.getData();
  }

  getData(event: any = null) {
    const promise = [];
    promise.push(this._elements.loadFromDataBase());
    promise.push(this._places.loadFromDataBase());
    Promise.all(promise).then(val => {


      this.checkList();
      this.loading.dismiss();
      if (event != null) {
        event.target.complete();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  goToElement(id: number): void {

    this._router.navigate(['../information/element:' + id + '/brak']);
  }

  goToPlace(id: number | string): void {
    this._router.navigate(['../information/miejsce:' + id + '/brak']);
  }

  checkList() {
    console.log(this._elements.elementsList.value)
    if (this.selectedType === 'kategoria') {

      this.findList = this._elements.elementsList.value.filter((k: ElementClass) => {
        if (k.nazwa_kategorii == null) {
          k.nazwa_kategorii = '';
        }

        if (k.nazwa_kategorii.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
      if (this.elementSelectedFiler === 'dostepne') {
        this.findList = this.findList.filter(k => k.czyWypozyczone === '0');
      }
      if (this.elementSelectedFiler === 'niedostepne') {
        this.findList = this.findList.filter(k => k.czyWypozyczone === '1');
      }

      if (this.elementSelectedFiler2 === 'sprawne') {
        this.findList = this.findList.filter(k => k.sprawnosc === '1');
      }
      if (this.elementSelectedFiler2 === 'niesprawne') {
        this.findList = this.findList.filter(k => k.sprawnosc === '0');
      }
      return;
    }

    console.log(1)
    if (this.searchInput.length > 0) {
      this.findList = this._elements.elementsList.value.filter(val => {
        if (val.nazwa.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    } else {
      this.findList = this._elements.elementsList.value;
    }

    if (this.elementSelectedFiler === 'dostepne') {
      this.findList = this.findList.filter(k => k.czyWypozyczone === '0');
    }
    if (this.elementSelectedFiler === 'niedostepne') {
      this.findList = this.findList.filter(k => k.czyWypozyczone === '1');
    }

    if (this.elementSelectedFiler2 === 'sprawne') {
      this.findList = this.findList.filter(k => k.sprawnosc === '1');
    }
    if (this.elementSelectedFiler2 === 'niesprawne') {
      this.findList = this.findList.filter(k => k.sprawnosc === '0');
    }


    this.findListPlace = this._places.placesList.value.filter(val => {
      if (val.nazwa.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });


  }


  async doRefresh(event) {

    this.getData(event);

  }
}
