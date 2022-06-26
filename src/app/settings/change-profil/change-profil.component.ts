import {Component, OnInit} from '@angular/core';
import {User} from '../../_modal/user';
import {ApiService} from '../../_services/api.service';
import {ApiResponse} from '../../_modal/api-response';

@Component({
  selector: 'app-change-profil',
  templateUrl: './change-profil.component.html',
  styleUrls: ['./change-profil.component.scss', '../settings.page.scss'],
})
export class ChangeProfilComponent implements OnInit {
  modalIsOpen = false;
  public user: User = new User();

  constructor(private api: ApiService) {
  }

  open(): void {
    this.modalIsOpen = false;
    setTimeout(() => {
      this.modalIsOpen = true;
    }, 10);
    this.getData();
  }

  getData() {
    this.api.getDefault('uzytkownikInfo').then((data: ApiResponse) => {
      Object.assign(this.user, data.value[0]);
      // console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
  }
}
