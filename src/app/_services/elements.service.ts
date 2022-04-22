import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../_modal/api-response';
import { ElementClass } from '../_modal/element';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  public elementsList : BehaviorSubject<Array<ElementClass>> = new BehaviorSubject<Array<ElementClass>>([])
  constructor(private _api: ApiService) { }
  loadFromDataBase():Promise<Array<ElementClass>>{
    return new Promise<Array<ElementClass>>(((resolve, reject) => {
      this._api.getDefault("elementy").then((dane:ApiResponse)=>{
        const val:Array<ElementClass> = dane.value;
        this.elementsList.next(val);
        resolve(val);
      }).catch(error=>{
        reject([])
      })
    }))

  }
}
