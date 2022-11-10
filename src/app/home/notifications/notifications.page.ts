import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {ApiResponse} from "../../_modal/api-response";
import {Notifications} from "../../_modal/notifications";
import {LoadingService} from "../../_services/loading.service";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  @ViewChild('container') containerView: ElementRef;
  @ViewChild('list') listView: ElementRef;
  @ViewChild('card') cardView: ElementRef;
  public notificationList: Array<Notifications> = [];
  public cp = 1;
  public selectedNotification: Notifications = new Notifications();
  private dataRefreshInterval: any;

  constructor(private api: ApiService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
  }

  getHeight(): number {
    return Math.floor((document.getElementById('containerNot').clientHeight - 91 - document.getElementById('card').clientHeight) / 67);
  }


  ionViewDidLeave() {
    clearInterval(this.dataRefreshInterval)
  }

  async ionViewWillEnter() {
    this.loadingService.create();
  }

  async ionViewDidEnter() {

    this.getData().then(() => {
      this.loadingService.dismiss()
      if (this.notificationList.length > 0) {
        this.selectedNotification = this.notificationList[0]
      }
    })


    this.dataRefreshInterval = setInterval(() => this.getData(), 5000);

  }

  public selectNotification(not: Notifications) {
    this.selectedNotification = not;
    not.odebrane = '1';
    this.setNotifivationAsReaded(not);
  }

  public async setNotifivationAsReaded(not: Notifications) {
    try {
      var odp = await this.api.getDefault('powiadomianieUstawJakoPrzeczytane/' + not.id);
    } catch (k) {
    }
  }

  private getData() {
    return new Promise((resolve) => {
      const tempList: Array<Notifications> = [];
      this.api.getDefault('uzytkownikPowiadomiania/100').then((k: ApiResponse) => {
        k.value.forEach(not => {
          tempList.push(Object.assign(new Notifications(), not));
        });
        if (JSON.stringify(this.notificationList) !== JSON.stringify(tempList)) {
          this.notificationList = tempList;
        }
        resolve(true);
      });
    });

  }

  async doRefresh(event): Promise<any> {
    await this.getData();
    event.target.complete();
  }
}
