import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicQueryNoCountResponseItem } from '../model/queryresponses/basicQueryNoCountResponse';
import { BasicRequestQueryItem } from '../model/queryresponses/basicRequestQueryItem';
import { SatisfactionQueryItem } from '../model/queryresponses/satisfactionQueryResponse';
import { WLIBoxPlotqueryItem } from '../model/queryresponses/wliBoxPlotQueryItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:5001"
  public dbObservable = new EventEmitter<string>()
  private db: string = 'influx'

  constructor(private http: HttpClient) { }

  // SERVICE SETTINGS

  setDB(db:string) {
    this.db = db
    this.dbObservable.emit(db)
  }

  getDB() {
    return this.db
  }

  getObservable() {
    return this.dbObservable.asObservable()
  }

  // QUERY

  getBasicQuery(field1: string, field2: string, model: string): Observable<SatisfactionQueryItem[]> {
    let body = {
      db: this.db,
      field1: field1,
      field2: field2,
      model_filter: model
    }
    return this.http.post<SatisfactionQueryItem[]>(this.url + "/query/basicQuery", body)
  }

  getBasicQueryNoCOunt(field1: string, field2: string, model: string): Observable<BasicQueryNoCountResponseItem[]> {
    let body = {
      db: this.db,
      field1: field1,
      field2: field2,
      model_filter: model
    }
    return this.http.post<BasicQueryNoCountResponseItem[]>(this.url + "/query/basicQueryNoCount", body)
  }

  getwliBoxplotQuery(field: string, model: string): Observable<WLIBoxPlotqueryItem[]> {
    let body = {
      db: this.db,
      field: field,
      model_filter: model
    }
    return this.http.post<WLIBoxPlotqueryItem[]>(this.url + "/query/wliboxplotquery", body)
  }

  getBasicRequestQuery(field: string): Observable<BasicRequestQueryItem[]> {
    let body = {
      db: this.db,
      field: field
    }
    return this.http.post<BasicRequestQueryItem[]>(this.url + '/query/basicRequestQuery', body)
  }

  //INSERTION

  initializeDB(db: string) {
    return this.http.post<BasicRequestQueryItem[]>(this.url + '/insertion/initializeDB', {db: db})
  }

  insertOneMonth(db: string) {
    let body = {
      year: 2024,
      month: 5,
      db: db
    }
    return this.http.post<BasicRequestQueryItem[]>(this.url + '/insertion/insertOneMonth', body)
  }
}
