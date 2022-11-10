import {Component, OnInit} from '@angular/core';
import {User} from '../../_modal/user';
import {ApiService} from '../../_services/api.service';
import {ApiResponse} from '../../_modal/api-response';
import {FooterService} from "../../_services/footer.service";
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-change-profil',
  templateUrl: './change-profil.component.html',
  styleUrls: ['./change-profil.component.scss', '../settings.page.scss'],
})
export class ChangeProfilComponent implements OnInit {
  public modalPlaceIsOpen = false;
  public user: User = new User();
  public editMode = false;

  constructor(private api: ApiService, public _footer: FooterService, private toast: ToastService) {
  }

  open(): void {
    this.getData();
    this.modalPlaceIsOpen = false;
    setTimeout(() => {
      this.modalPlaceIsOpen = true;
      this._footer.bannerIconDisplay = false;
      this._footer.backObserver(true).then(k => this.modalPlaceIsOpen = k);
    }, 10);
  }

  getData() {
    this.api.getDefault('uzytkownikInfo').then((data: ApiResponse) => {
      Object.assign(this.user, data.value[0]);
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  async saveData() {
    if (!this.user.checkEmail()) {
      await this.toast.toast({
        message: 'Podany adres email nie należy do adresów należących do uczelni PWSTE Jarosław',
        duration: 2000,
        icon: 'alert-outline'
      });
      //return;
    }


    var data = {};
    data['imie'] = this.user.imie;
    data['nazwisko'] = this.user.nazwisko
    data['tytul'] = this.user.tytul
    data['rok_zakonczenia'] = this.user.rok_zakonczenia
    data['rok_rozpoczecia'] = this.user.rok_rozpoczecia
    data['email'] = this.user.email
    data['nr_indeksu'] = this.user.nr_indeksu
    console.log(data)
    try {
      var respo = (await this.api.patchDefault('uzytkownikMobileUpdate', data));
    } catch (k) {
      await this.toast.toast({
        message: 'Aktualizacja nie udana',
        duration: 2000,
        position: 'top',
        icon: 'alert-circle-outline'
      });
    }
    await this.toast.toast({
      message: 'Aktualizacja udana',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-done-outline'
    });
    this.editMode = false;
    this.getData();


  }

  ionViewWillEnter() {
  }

  ngOnInit() {
  }
}
