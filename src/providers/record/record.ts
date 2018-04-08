import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {SqlService} from "../../services/SqlService";

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {

  constructor(public sqlService: SqlService) {
    console.log('initRecordTable');
    this.initRecordTable();
  }

  //初始化数据库
  initRecordTable() {
    this.sqlService.execSql('CREATE TABLE IF NOT EXISTS records (id CHAR(36) PRIMARY KEY, userId VARCHAR(30) NOT NULL, brand VARCHAR(300), address VARCHAR(320), borrowDate VARCHAR(50),type VARCHAR(50));',[]).then(() => {
      console.info('创建记录表', '表名:', 'records', '创建成功');
    }).catch(err => {
      console.error("出错了", err);
    });

  }


  insertIntoRecordTable(record: any) {
    this.initRecordTable();
    return this.sqlService.execSql('INSERT INTO records VALUES (?, ?, ?, ?, ?,?);', [record.id, record.userId, record.brand, record.address, record.borrowDate,record.type]);
  }

  //根据用户
  queryRecordTable(account) {

    return this.sqlService.execSql("select * from records where userId='" + account + "' order by rowid desc");
  }
}
