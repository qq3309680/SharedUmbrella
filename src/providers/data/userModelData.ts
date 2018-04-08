import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SqlService} from "../../services/SqlService";
import {UserModel} from "../../models/user-model";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class userModelDataProvider {

  constructor(private sqlService: SqlService) {
    console.dir("userModelData---Init");
    this.initDatabase();
  }

  //初始化数据库
  initDatabase() {
    this.sqlService.execSql('CREATE TABLE IF NOT EXISTS users(account VARCHAR(320) PRIMARY KEY,  password VARCHAR(50) NOT NULL, username VARCHAR(300), mobile CHAR(11), station VARCHAR(100));',[]).then((val) => {
      console.dir(val);
      console.info('创建用户表', '表名:', 'users', '创建成功');
    }).catch(err => {
      console.error("出错了", err);
    });

  }

  //插入user数据
  insertIntoUserTable(user: UserModel) {
   return this.sqlService.execSql('INSERT INTO users VALUES (?, ?, ?, ?, ?);', [user.account, user.password, user.username, user.mobile, user.station]);
  }

  //根据账号查询用户
  queryUserTable(account) {

   return   this.sqlService.execSql("select * from users where account='"+account+"'");

  }


//建表
  createTable(obj: any) {
    this.sqlService.execSql(obj.sql).then(() => {
      console.info(obj.desc, '表名:', obj.tableName, '创建成功');
    }).catch(err => {
      console.error("出错了", err.error.message);
    });

  }

  //修改数据
  updateData(data: any, item: any) {
    let sql = "update depot set depot_name='" + data.depot_name + "' where depot_no='" + item.depot_no + "'";
    this.sqlService.execSql(sql, []).then(() => {

    }).catch((err) => {
      console.error(err);
    });
  }


}


