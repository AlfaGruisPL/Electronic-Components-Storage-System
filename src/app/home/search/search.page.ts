import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ElementClass } from 'src/app/_modal/element';
import { Miejsce } from 'src/app/_modal/miejsce';
import { ElementsService } from 'src/app/_services/elements.service';
import { PlacesService } from 'src/app/_services/places.service';
import {FooterService} from "../../_services/footer.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private searchInput = ""
  public findList: Array<ElementClass>=[];
  public findListPlace:Array<Miejsce>=[];
  public displayElements = true;
  public displayPlaces = false;
  constructor(public _footer: FooterService,public _elements : ElementsService,private _router:Router,public _places: PlacesService) {
  }

  ngOnInit() {
    var promise = [];
    promise.push(this._elements.loadFromDataBase());
    promise.push(this._places.loadFromDataBase());
    Promise.all(promise).then(val=>{
      this.checkList();
    }).catch(error=>{
      console.log(error);
    })
  }
  goToElement(id:number):void{
    this._router.navigate(['../information/k_'+id+"/brak"])
  }
  checkList(){
    if(this.searchInput.length>0){
    this.findList = this._elements.elementsList.value.filter(val=>{
      if(val.nazwa.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1){
        return true;
      }
      return false;
    })
    }else{

      this.findList = this._elements.elementsList.value;
    }

    this.findListPlace = this._places.placesList.value.filter(val=>{
      if(val.nazwa.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1){
        return true;
      }
      return false;
    })


  }

}
