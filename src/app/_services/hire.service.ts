import {Injectable} from '@angular/core';
import {Hire} from "../_modal/hire";

@Injectable({
  providedIn: 'root'
})
export class HireService {
  selectedHire: Hire = new Hire();

  constructor() {
  }
}
