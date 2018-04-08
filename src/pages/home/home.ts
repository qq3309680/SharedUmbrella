import {Component} from '@angular/core';
import {NavController, MenuController, App} from 'ionic-angular';
import {RecordProvider} from "../../providers/record/record";
import {UserModel} from "../../models/user-model";
import {AppGlobal} from "../../GlobalData/AppGlobal";
import {Storage} from "@ionic/storage";
import {Login1Page} from "../login1/login1";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: UserModel;
  recordList: any[];

  constructor(private navCtrl: NavController, private menu: MenuController, private storage: Storage,private barcodeScanner:BarcodeScanner, private recordData: RecordProvider) {
    // this.recordList = [{brand: "天堂牌雨伞", type: "还", time: "2017-11-05 18:30", address: "万达广场"},
    //   {brand: "天堂牌雨伞", type: "借", time: "2017-11-02 18:30", address: "万达广场"}
    // ];

  }

  ionViewDidEnter() {
    this.storage.get("userInfo").then((val) => {
      this.user = val;

      if (this.user) {
        console.dir(this.user);
        let output = [];
        this.recordData.queryRecordTable(this.user.account).then((data) => {
          console.dir(data);
          for (let i = 0; i < data.rows.length; i++) {
            output.push(data.rows.item(i));
          }
          this.recordList = output;
          console.dir(this.recordList);
        }).catch(e => {
          console.dir(e);
        });
      } else {
        this.navCtrl.push(Login1Page);
      }
    });
  }

  scannerBarCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      //alert(barcodeData.text);
      this.recordData.insertIntoRecordTable({
        id: this.guid(),
        userId: this.user.account,
        brand: "天堂雨伞",
        address: "万达广场",
        type: "还",
        borrowDate: new Date().toLocaleDateString()
      }).then(data => {
        alert("还伞成功");
        this.ionViewDidEnter();
      }).catch(e => {
        console.dir(e);
      });
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      alert("请确认获得摄像头权限.");
      // console.dir(this.guid());
      // console.dir(this.user.account);
      // this.recordData.insertIntoRecordTable({
      //   id: this.guid(),
      //   userId: this.user.account,
      //   brand: "天堂雨伞",
      //   address: "万达广场",
      //   type: "还",
      //   borrowDate: new Date().toLocaleDateString()
      // }).then(data => {
      //   alert("还伞成功");
      //   this.ionViewDidEnter();
      // }).catch(e => {
      //   console.dir(e);
      // });
      console.log('Error', err);
    });

  }
  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  }
}
