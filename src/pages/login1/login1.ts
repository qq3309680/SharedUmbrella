import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator} from "@angular/forms";
import {userModelDataProvider} from "../../providers/data/userModelData";
import {TabsPage} from "../tabs/tabs";

import {Storage} from "@ionic/storage";

import {SQLiteObject} from "@ionic-native/sqlite";
import {RegistPage} from "../regist/regist";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page {
  form: FormGroup;
  returnMessage: string;
  userInfo: UserModel;
  loginFail: boolean = false;
  loading: boolean = false;
  database: SQLiteObject;//sqlite数据库
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(FormBuilder) fb: FormBuilder, public userModelService: userModelDataProvider,  private storage: Storage) {
    this.form = fb.group({account: "", password: ""});
  }

  ionViewDidLoad() {
    //console.dir(this.userModelService.getUserInfo());
  }

  GotoRegist() {
    this.navCtrl.push(RegistPage);
  }

  submitForm() {
    this.loading = true;
    let accountInfo = this.form.value;
    console.dir(accountInfo);
    let output = [];
    let user = this.userModelService.queryUserTable(accountInfo.account).then((data) => {
      console.dir(data);
      for (let i = 0; i < data.rows.length; i++) {
        output.push(data.rows.item(i));
      }

      if (output.length > 0) {

        this.userInfo = output[0];
        if (this.userInfo.password == accountInfo.password) {
          this.returnMessage = "成功";
          this.storage.set("userInfo", this.userInfo);
          this.navCtrl.push(TabsPage, {"userInfo": this.userInfo});
        } else {
          this.loginFail = true;
          this.returnMessage = "账号密码错误.";
        }

      } else {
        this.loginFail = true;
        this.returnMessage = "账号密码错误.";
      }
      this.loading = false;
    }).catch(e => {
      console.dir(e);
      this.loginFail = true;
      this.returnMessage = "账号密码错误.";
      this.loading = false;
    });

  }
}
