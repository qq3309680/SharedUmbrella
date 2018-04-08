import {Component, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator} from "@angular/forms";
import {userModelDataProvider} from "../../providers/data/userModelData";
import {UserModel} from "../../models/user-model";
import {Login1Page} from "../login1/login1";

/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage {
  registform: FormGroup;
  loading: boolean = false;
  userModel: UserModel;
  returnMessage: string;
  loginFail: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(FormBuilder) fb: FormBuilder, public userModelService: userModelDataProvider) {
    this.registform = fb.group({account: "", username: "", password: "", comfirmpassword: "", station: ""});
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegistPage');
  }

  submitForm() {

    let userInfo = this.registform.value;
    //console.dir(userInfo);
    let flag = true;
    this.userModel = new UserModel();
    if (userInfo.password == userInfo.comfirmpassword) {
      this.userModel.account = userInfo.account;
      this.userModel.password = userInfo.password;
      this.userModel.username = userInfo.username;
      this.userModel.mobile = userInfo.account;
      this.userModel.station = userInfo.station;
      console.dir(this.userModel);
      this.loading = true;
      this.userModelService.insertIntoUserTable(this.userModel).then((val) => {
        console.log('insert into users table successfully');
        console.dir("successfully");
        console.dir(val);
        flag = true;
        alert("注册成功.");
        this.navCtrl.push(Login1Page);

      }).catch(e => {
        //alert(e.toString());
        console.log(e);
        flag = false;
        this.loginFail = true;
        this.returnMessage = "注册失败,请重新注册.";
        //this.returnMessage=e;
        this.loading = false;
      });
    } else {
      this.loginFail = true;
      this.returnMessage = "前后密码不一致.";
      flag = false;
    }

  }
}
