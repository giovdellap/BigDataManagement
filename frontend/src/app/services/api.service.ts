import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestResponse } from '../model/testResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:5001"

  constructor(private http: HttpClient) { }

  getTestQuery(): Observable<TestResponse> {
    let body = {
      db: "cassandra",
      field: "wli"
  }
    return this.http.post<TestResponse>(this.url + "/query/satisfaction", body)
  }
}
