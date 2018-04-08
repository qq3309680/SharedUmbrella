import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject, SQLiteTransaction} from '@ionic-native/sqlite';

@Injectable()
export class SqlService {
  private _db: any;
  private win: any = window;

  constructor(public sqlite: SQLite) {
    //兼容真机与浏览器运行
    if (this.win.sqlitePlugin) {
      //alert("真机1");
      this._db = this.sqlite.create({
        name: 'myApp.db',
        location: 'default'
      });
    } else {
      //alert("浏览器1");
      this._db = this.win.openDatabase("myApp.db", '1.0', 'database', 5 * 1024 * 1024);
    }
  }

  /**
   * 执行SQL语句，返回一个承诺,通过 .then(result=>{}).catch(err=>{})来处理结果
   * @param sql  sql语句
   * @param params sql参数值，可选参数，只有sql语句中用到 ? 传参方式时，params参数值才有效
   */
  execSql(sql: string, params = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.win.sqlitePlugin) {
          //alert("真机");
          this._db = this.sqlite.create({
            name: 'myApp.db',
            location: 'default'
          });
          console.dir(this._db);
          this._db.then((db: any) => {
            console.dir(db);
            db.executeSql(sql,params).then((res)=>resolve(res),(rej)=>reject(rej));
          }).catch((rej)=>reject(rej));

        } else {
          //alert("浏览器");
          console.dir(this._db);
          this._db.transaction((tx) => {

              tx.executeSql(sql, params,
                (tx, res) => resolve(res),
                (tx, err) => reject(err));
            },
            (err) => reject(err));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

}
