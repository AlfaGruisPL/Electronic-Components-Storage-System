import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localStorage: Storage,
              public toastController: ToastController,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private router: Router,
              private api: ApiService) {
  }

  public async startApp(): Promise<void> {
    const storage = await this.localStorage.create();
    storage.get('login').then(data => {
      if (data.length > 0) {
        console.log('%cDane w storage znalezione', 'color:green');
        this.router.navigate(['home']);
      }
    }).catch(data => {
      console.log('%cBrak danych w storage', 'color:red');
    });
  }

  public async checkStorage(): Promise<boolean> {


    return new Promise(async (resolve, reject) => {
      const storage = await this.localStorage.create();
      var promiseArr = [];
      promiseArr.push(storage.get('login'));
      promiseArr.push(storage.get('password'));
      Promise.all(promiseArr).then(async fromStorage => {
        if (fromStorage[0].length > 0 && fromStorage[1].length > 0) {
          const loading = await this.loadingController.create({
            message: 'Trwa automatyczne logowanie...',
          });
          await loading.present();
          this.logInF(fromStorage[0], fromStorage[1], true, true).then(() => {
            resolve(true);
            loading.dismiss();
          }).catch(() => {
            reject(false);
            loading.dismiss();
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


  public logInF(login: string, password: string, saveToLocalStorage: boolean, hideCommunicate = false): Promise<number> {
    var t1 = new Date().getTime();
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
        resolve(new Date().getTime() - t1);
      }).catch(async data => {

        let toast;
        switch (data.status) {
          case 423:
            toast = await this.toastController.create({
              message: 'Twoje konto jest zostało dezaktywowane',
              duration: 2000
            });
            break;
          case 424:
            toast = await this.toastController.create({
              message: 'Twoje konto jest zarchiwizowane',
              duration: 2000
            });
            break;
          default:
            toast = await this.toastController.create({
              message: 'Logowanie nie udane',
              duration: 2000
            });
            break;
        }
        toast.present();
        reject(new Date().getTime() - t1);

      });
    });
  }
}
