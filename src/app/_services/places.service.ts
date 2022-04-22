import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../_modal/api-response';
import { Miejsce } from '../_modal/miejsce';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public placesList : BehaviorSubject<Array<Miejsce>> = new BehaviorSubject<Array<Miejsce>>([])
  constructor(private _api: ApiService) { }
  loadFromDataBase():Promise<Array<Miejsce>>{
    return new Promise<Array<Miejsce>>(((resolve, reject) => {
      this._api.getDefault("miejsca").then((dane:ApiResponse)=>{
        const val:Array<Miejsce> = dane.value;
        this.placesList.next(val);
        resolve(val);
      }).catch(error=>{
        reject([])
      })
    }))

  }
}
