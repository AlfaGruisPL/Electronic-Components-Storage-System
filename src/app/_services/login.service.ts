import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {ActionPerformed, PushNotifications, PushNotificationSchema, Token} from "@capacitor/push-notifications";
import {FooterService} from "./footer.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public firebaseToken = '';

  constructor(private localStorage: Storage,
              public toastController: ToastController,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private router: Router,
              private footer: FooterService,
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
      //oczekiwanie na token urządzenia w celu wysyłania powiadomień
      this.OpenNotificationChanel().then(() => {
        this.api.login(login, password, this.firebaseToken, saveToLocalStorage).then(async data => {

          if (hideCommunicate === false) {

            const toast = await this.toastController.create({
              message: 'Logowanie udane',
              duration: 400,
              position: 'top',
              icon: 'key-outline',
              cssClass: 'betterToast',
              buttons: [
                {
                  text: 'Schowaj',
                  role: 'cancel',
                  handler: () => {
                    this.footer.showBanner();
                  }
                }
              ],
            });
            toast.present();
            this.footer.hideBanner(400);
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
            case 425:
              toast = await this.toastController.create({
                message: 'Twoje konto nie zostało potwierdzone, sprawdź swoją skrzynkę pocztową oraz potwierdź swoje konto',
                duration: 4000,
                icon: 'key-outline',
                position: 'top',
                cssClass: 'betterToast',
                buttons: [
                  {
                    text: 'Schowaj',
                    role: 'cancel',
                    handler: () => {
                      this.footer.showBanner();
                    }
                  }
                ],
              });
              this.footer.hideBanner(4000);
              break;
            case 423:
              toast = await this.toastController.create({
                message: 'Twoje konto zostało dezaktywowane',
                duration: 2000,
                icon: 'key-outline',
                position: 'top',
                cssClass: 'betterToast',
                buttons: [
                  {
                    text: 'Schowaj',
                    role: 'cancel',
                    handler: () => {
                      this.footer.showBanner();
                    }
                  }
                ],
              });
              this.footer.hideBanner(2000);
              break;
            case 424:
              toast = await this.toastController.create({
                message: 'Twoje konto jest zarchiwizowane',
                duration: 2000,
                icon: 'key-outline',
                position: 'top',
                cssClass: 'betterToast',
                buttons: [
                  {
                    text: 'Schowaj',
                    role: 'cancel',
                    handler: () => {
                      this.footer.showBanner();
                    }
                  }
                ],
              });
              break;
            default:
              toast = await this.toastController.create({
                message: 'Podane dane logowania nie są poprawne',
                duration: 2000,
                icon: 'key-outline',
                position: 'top',
                cssClass: 'betterToast',
                buttons: [
                  {
                    text: 'Schowaj',
                    role: 'cancel',
                    handler: () => {
                      this.footer.showBanner();
                    }
                  },

                ],
              });
              this.footer.hideBanner(2000);
              break;
          }
          toast.present();
          reject(new Date().getTime() - t1);
        });
      });
    });

  }

  OpenNotificationChanel(): Promise<boolean> {

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        console.log('%cPushNotifications granted', 'color:magenta');
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        console.log('%cPushNotifications not granted', 'color:magenta');
      }
    });


    // On success, we should be able to receive notifications


    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('%cError on registration: ' + JSON.stringify(error), 'color:magenta');
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('%cPush received: ' + JSON.stringify(notification), 'color:magenta');
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('%cPush action performed: ' + JSON.stringify(notification), 'color:magenta');
      }
    );

    return new Promise((resolve) => {
      PushNotifications.addListener('registration',
        (token: Token) => {
          console.log('%cPush registration success, token: ' + token.value, 'color:magenta')
          this.firebaseToken = token.value;
          resolve(true);
          //alert('Push registration success, token: ' + token.value);
        }
      );
    });
  }
}
