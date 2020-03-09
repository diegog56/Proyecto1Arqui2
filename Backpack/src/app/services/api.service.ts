import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URI = 'http://18.222.157.241:3000/';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${this.API_URI}api/Record`);
  }
}
