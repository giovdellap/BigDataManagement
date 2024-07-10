import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SatisfactionQueryItem } from '../model/queryresponses/satisfactionQueryResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:5001"

  constructor(private http: HttpClient) { }

  getTestQuery(field: string): Observable<SatisfactionQueryItem[]> {
    console.log('field', field)
    let body = {
      db: "cassandra",
      field: field
  }
    return this.http.post<SatisfactionQueryItem[]>(this.url + "/query/satisfaction", body)
  }
}
