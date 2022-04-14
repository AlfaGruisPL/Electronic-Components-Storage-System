import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementClass } from '../_modal/element';
import { QrOut } from '../_modal/qr-out';
import { ApiService } from '../_services/api.service';
import { QrcodeService } from '../_services/qrcode.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  public mode:string ="";
  public element: ElementClass;
  public modalPlaceIsOpen = false;
  constructor(private route: ActivatedRoute,private _router:Router,private _api: ApiService,private _qr: QrcodeService) { }
  public displayDescription = false;
  ngOnInit() {
    this.route.params.subscribe(
      (params: QrOut) => {
        if(params.text.charAt(0).toUpperCase() == "K"&& params.text.charAt(1)=="_"){
          this.mode = "element"
          this._api.getDefault("elementInfo/"+params.text.split("_")[1]).then(data=>{
            this.element = data['value'][0];
          })
        }else if(params.text.charAt(0).toUpperCase() == "M"&& params.text.charAt(1)=="_") {
          this.mode = "miejsce"
        } else{
          this.mode = "nieZnane"
        }

      }
    );
  }
  getInfo():void{
    this._qr.getInfo().then(data=>{
      this._router.navigate(["/information/"+data.text.toString()+"/"+data.format.toString()])
    });
  }
  ToMenu():void{
    this._router.navigate(['/home'])
  }
  openModalPlacePrimary():void{
      this.modalPlaceIsOpen= !this.modalPlaceIsOpen
  }

  openModalPlaceTemporary():void{

  }
}
