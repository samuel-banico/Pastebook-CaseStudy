import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = 'https://localhost:7185/api/home';
  
  constructor(
    private http: HttpClient
    
  ) { }

  search(searchUser: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/searchUser' + `?user=${searchUser}`);
  }
}