import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiResponse} from '../_modal/api-response';
import {Miejsce} from '../_modal/miejsce';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public placesList: BehaviorSubject<Array<Miejsce>> = new BehaviorSubject<Array<Miejsce>>([])

  constructor(private _api: ApiService) {
  }

  loadFromDataBase(): Promise<Array<Miejsce>> {
    return new Promise<Array<Miejsce>>(((resolve, reject) => {
      this._api.getDefault("miejsca").then((dane: ApiResponse) => {
        var val: Array<Miejsce> = dane.value;
        val = val.sort((k1, k2) => {
          if (k1.nazwa.toLowerCase() > k2.nazwa.toLowerCase()) {
            return 1;
          } else if (k1.nazwa.toLowerCase() < k2.nazwa.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        });
        this.placesList.next(val);
        resolve(val);
      }).catch(error => {
        reject([])
      })
    }))

  }
}
