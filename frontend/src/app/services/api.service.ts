import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicQueryNoCountResponseItem } from '../model/queryresponses/basicQueryNoCountResponse';
import { SatisfactionQueryItem } from '../model/queryresponses/satisfactionQueryResponse';
import { WLIBoxPlotqueryItem } from '../model/queryresponses/wliBoxPlotQueryItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:5001"

  constructor(private http: HttpClient) { }

  getBasicQuery(field1: string, field2: string, model: string): Observable<SatisfactionQueryItem[]> {
    let body = {
      db: "cassandra",
      field1: field1,
      field2: field2,
      model_filter: model
    }
    return this.http.post<SatisfactionQueryItem[]>(this.url + "/query/basicQuery", body)
  }

  getBasicQueryNoCOunt(field1: string, field2: string, model: string): Observable<BasicQueryNoCountResponseItem[]> {
    let body = {
      db: "cassandra",
      field1: field1,
      field2: field2,
      model_filter: model
    }
    return this.http.post<BasicQueryNoCountResponseItem[]>(this.url + "/query/basicQueryNoCount", body)
  }

  getwliBoxplotQuery(field: string, model: string): Observable<WLIBoxPlotqueryItem[]> {
    let body = {
      db: "cassandra",
      field: field,
      model_filter: model
    }
    return this.http.post<WLIBoxPlotqueryItem[]>(this.url + "/query/wliboxplotquery", body)
  }
}
