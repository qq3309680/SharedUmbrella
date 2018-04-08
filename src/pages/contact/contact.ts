import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {RecordProvider} from "../../providers/record/record";
import {UserModel} from "../../models/user-model";
import {AppGlobal} from "../../GlobalData/AppGlobal";
import {HomePage} from "../home/home";

declare var BMap;
declare var BMap_Symbol_SHAPE_POINT;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  myIcon: any;
  user: UserModel;

  constructor(private navCtrl: NavController, private geolocation: Geolocation, private barcodeScanner: BarcodeScanner, private recordData: RecordProvider) {
    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
    this.user = AppGlobal.getInstance().currentUserInfo;
    console.dir(this.user);
  }

  scannerBarCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      //alert(barcodeData.text);
      this.recordData.insertIntoRecordTable({
        id: this.guid(),
        userId: this.user.account,
        brand: "天堂雨伞",
        address: "万达广场",
        type: "借",
        borrowDate: new Date().toLocaleDateString()
      }).then(data => {
        alert("借伞成功");
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
      //   type: "借",
      //   borrowDate: new Date().toLocaleDateString()
      // }).then(data => {
      //   alert("借伞成功");
      //   //this.navCtrl.push(HomePage);
      // }).catch(e => {
      //   console.dir(e);
      // });
      console.log('Error', err);
    });

  }

  ionViewDidEnter() {
    let map =
      this.map =
        new BMap.Map(
          this.map_container.nativeElement,
          {
            enableMapClick: true,//点击拖拽
            enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
            enableContinuousZoom: true //连续缩放效果，默认禁用
          }
        );//创建地图实例
    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市
    let point = new BMap.Point(113.38028471135, 23.129702256122);//坐标可以通过百度地图坐标拾取器获取
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    map.centerAndZoom(point, 18);//设置中心和地图显示级别
    // let sizeMap = new BMap.Size(10, 80);//显示位置
    // map.addControl(new BMap.NavigationControl());
    // let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(300, 157));
    // let marker = this.marker = new BMap.Marker(point, { icon: myIcon });
    // map.addOverlay(marker);
  }

  getLocationByBrowser() {
    let geolocation1 = this.geolocation1 = new BMap.Geolocation();
    geolocation1.getCurrentPosition((r) => {
      let mk = this.marker = new BMap.Marker(r.point, {icon: this.myIcon});
      if (geolocation1.getStatus() == "BMAP_STATUS_SUCCESS") {
        this.map.addOverlay(mk);
        this.map.panTo(r.point, 16);
        console.log('浏览器定位：您的位置是 ' + r.point.lng + ',' + r.point.lat);
      }
      else {
        alert('failed' + this.geolocation1.getStatus());
      }
    }, {enableHighAccuracy: false})
  }

  getLocationByIp() {
    let myCity = new BMap.LocalCity();
    myCity.get(result => {
      let cityName = result.name;
      this.map.setCenter(cityName);
      console.log("当前定位城市:" + cityName);
    });
  }

  getLocationByCity() {
    let city = "广州";
    if (city != "") {
      this.map.centerAndZoom(city, 16);      // 用城市名设置地图中心点
    }
  }

  getLocationByLatLon() {
    let point = new BMap.Point(113.38028471135, 23.129702256122);
    let marker = this.marker = new BMap.Marker(point, {icon: this.myIcon});
    this.map.addOverlay(marker);
    this.map.centerAndZoom(point, 16);
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      pointArr.push(locationPoint);
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          let marker = this.marker = new BMap.Marker(data.points[0], {icon: this.myIcon});
          this.map.panTo(data.points[0]);
          marker.setPosition(data.points[0]);
          this.map.addOverlay(marker);
        }
      })
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
    })
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  }

}
