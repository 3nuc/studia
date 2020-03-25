
import * as SQLite from 'expo-sqlite'
const getDb = () => SQLite.openDatabase('sqlite2.db');

export class SqliteService {
  constructor() {
    this.db = getDb();
    this.db.transaction(transaction => {
      this.createTables();
    })
  }

  private db : SQLite.WebSQLDatabase | null = null;

  private executeSql(sql: string, args?: any[], successCallback?: SQLite.SQLStatementCallback, failureCallback?: SQLite.SQLStatementErrorCallback) {
    this.db.transaction(transaction => {
      transaction.executeSql(sql, args, successCallback, failureCallback);
    })
  }

  private createTables() {
    return new Promise<void>((resolve, reject) => {
      this.executeSql(
        `
        CREATE TABLE IF NOT EXISTS temp.calculations (
            car_name varchar(200),
            image_url varchar(200),
            fuel_type varchar(200),
            fuel_efficiency varchar(200),
            creation_date varchar(200)
        )
      `
        , [], () => { resolve(); }, (t, e) => { reject(e); return false; });
    })
  }

  public addCalculation(carName: string, imageUrl: string, fuelType: 'diesel' | 'petrol', fuelEfficiency: string, creationDate: string) {
      return new Promise<void>((resolve, reject) => {
        this.executeSql(
          `
          INSERT INTO temp.calculations (
            car_name,
            image_url,
            fuel_type,
            fuel_efficiency,
            creation_date
          ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
          )
          `
          , [carName, imageUrl, fuelType, fuelEfficiency, creationDate], () => { resolve() }, (t, e) => { reject(e); return false;})
      })
  }
  public getCalculations() {
    return new Promise<GetCalculationResult[]>((resolve, reject) => {
      this.executeSql(
        `
          SELECT rowid, * FROM temp.calculations;
        `, [], (t, results) => { console.log(results.rows); resolve((<any>results.rows)._array as unknown as GetCalculationResult[]) }, (t, e) => { reject(); return false}
      )
    })
  }
  public deleteCalculation(rowid: number) {
    return new Promise<GetCalculationResult[]>((resolve, reject) => {
      this.executeSql(
        `
          DELETE FROM temp.calculations WHERE rowid = ?;
        `, [rowid], (t, results) => { console.log(results.rows); resolve((<any>results.rows)._array as unknown as GetCalculationResult[]) }, (t, e) => { reject(e); return false}
      )
    })
  }
}
    export interface GetCalculationResult {
      car_name: number,
      image_url: string,
      fuel_type: 'diesel' | 'petrol',
      fuel_efficiency: number;
      creation_date: string;
      rowid: string;
    };


// this.cosCoJestUndefined.prop //!! Error: cosCoJestUndefined is undefined
// //zazwyczaj robi sie tak:
// if (this.cosCoJestundefined !== undefined) { this.cosCojestUndefined.prop } //cosCojestUndefined jest obiektem bo sprawdzilismy

// //najnowszy syntax
// this.cosCojestUndefined?.prop ?? 'fallbackValue'