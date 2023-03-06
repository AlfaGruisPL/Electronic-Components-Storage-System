import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiResponse} from '../_modal/api-response';
import {ElementClass} from '../_modal/element';
import {ApiService} from './api.service';
import {ApiEndPoint} from '../_modal/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  public elementsList: BehaviorSubject<Array<ElementClass>> = new BehaviorSubject<Array<ElementClass>>([]);

  constructor(private _api: ApiService) {
  }

  loadFromDataBase(): Promise<Array<ElementClass>> {
    return new Promise<Array<ElementClass>>(((resolve, reject) => {
      this._api.getDefault(ApiEndPoint.elementy).then((dane: ApiResponse) => {
        var val: Array<ElementClass> = dane.value;
        val = val.sort((k1, k2) => {
          if (k1.nazwa.toLowerCase() > k2.nazwa.toLowerCase()) {
            return 1;
          } else if (k1.nazwa.toLowerCase() < k2.nazwa.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        });
        this.elementsList.next(val);
        resolve(val);
      }).catch(error => {
        reject([]);
      });
    }));

  }
}
