import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SQLite} from "@ionic-native/sqlite";


import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Login1Page} from "../pages/login1/login1";
import {MyAccountPage} from "../pages/my-account/my-account";
import { userModelDataProvider } from '../providers/data/userModelData';

import {IonicStorageModule} from "@ionic/storage";
import {SqlService} from "../services/SqlService";
import {RegistPage} from "../pages/regist/regist";
import {Geolocation} from "@ionic-native/geolocation";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import { RecordProvider } from '../providers/record/record';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    Login1Page,
    MyAccountPage,
    RegistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    Login1Page,
    MyAccountPage,
    RegistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SqlService,
    BarcodeScanner,
    userModelDataProvider,
    RecordProvider
  ]
})
export class AppModule {}
