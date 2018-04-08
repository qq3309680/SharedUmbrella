import { Component,ViewChild } from '@angular/core';
import { NavController,MenuController,Tabs } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Login1Page} from "../login1/login1";
import {MyAccountPage} from "../my-account/my-account";
import {Storage} from "@ionic/storage";
import {AppGlobal} from "../../GlobalData/AppGlobal";
import {UserModel} from "../../models/user-model";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabRef:Tabs;
  tabList:Array<{tabRoot:any,tabTitle:String,tabIcon:String}>;
  title:string="待办";
  constructor(public navCtrl: NavController,public menu:MenuController,public storage:Storage) {
    this.storage.get("userInfo").then((val)=>{
      AppGlobal.getInstance().currentUserInfo=val;
      if(AppGlobal.getInstance().currentUserInfo!=null){
      }else{
        this.navCtrl.push(Login1Page);
      }
    });

    this.tabList=[{tabRoot:HomePage,tabTitle:"记录",tabIcon:"ios-open-outline"},
      {tabRoot:ContactPage,tabTitle:"定位",tabIcon:"ios-compass-outline"},
      {tabRoot:MyAccountPage,tabTitle:"我",tabIcon:"ios-contact-outline"}
    ];

  }

  //当进入页面时触发
  ionViewDidEnter(){
    let mainTabs = this.tabRef;
    // mainTabs.select(1);
  }

  getTitle():void{
    console.dir(this.tabRef.getSelected().tabTitle);
    this.title=this.tabRef.getSelected().tabTitle;
  }
}
