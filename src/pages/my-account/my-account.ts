import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AppGlobal} from "../../GlobalData/AppGlobal";
import {Login1Page} from "../login1/login1";

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  userPageInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.userPageInfo = {
      Image: "/assets/imgs/bannerlogo.png"
    };
  }

  LogOut(){
    this.storage.remove("userInfo").then((val)=>{
      this.navCtrl.push(Login1Page);
    });

  }
  ionViewDidLoad() {

    this.storage.get("userInfo").then((val) => {
      console.dir(val);
      AppGlobal.getInstance().currentUserInfo = val;

      if (AppGlobal.getInstance().currentUserInfo != null) {
        //alert(AppGlobal.getInstance().currentUserInfo.username);
        let user= AppGlobal.getInstance().currentUserInfo;
        this.userPageInfo = {
          Name:user.username,
          Image: "../../assets/imgs/bannerlogo.png",
          Moblie:user.mobile,
          Station:user.station
        };
        console.dir(this.userPageInfo);
      } else {
        this.navCtrl.push(Login1Page);
      }
    });
  }

}
