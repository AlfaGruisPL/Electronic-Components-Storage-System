import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localStorage: Storage,
              public toastController: ToastController,
              public alertController: AlertController,
              private router: Router,
              private api: ApiService) {
  }


  public async checkStorage(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const storage = await this.localStorage.create();
      var promiseArr = [];
      promiseArr.push(storage.get('login'));
      promiseArr.push(storage.get('password'));
      Promise.all(promiseArr).then(fromStorage => {
        if (fromStorage[0].length > 0 && fromStorage[1].length > 0) {
          this.logInF(fromStorage[0], fromStorage[1], true, true).then(() => {
            resolve(true);
          }).catch(() => {
            reject(false);
          });
        } else {
          console.log('Brak danych w localStorage');
          reject(false);
        }
      }).catch(a => {

        reject(false);
      });
    });
  }


  public logInF(login: string, password: string, saveToLocalStorage: boolean, hideCommunicate = false): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.api.login(login, password).then(async data => {
        if (hideCommunicate === false) {
          const toast = await this.toastController.create({
            message: 'Logowanie udane',
            duration: 200,
            position: 'bottom'
          });
          toast.present();
        }
        if (saveToLocalStorage === true) {
          const storage = await this.localStorage.create();
          storage.set('login', login);
          storage.set('password', password);
        }
        this.router.navigate(['home']);
        resolve(true);
      }).catch(async data => {
        const toast = await this.toastController.create({
          message: 'Logowanie nie udane',
          duration: 2000
        });
        toast.present();
        reject(false);
      });
    });
  }
}
