import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from './session.service';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = 'https://localhost:7185/api/home';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })
  
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  search(searchUser: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/searchUser' + `?user=${searchUser}`, {headers: this.headers});
  }

  searchAllUser(searchUser: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/searchAllUsers' + `?user=${searchUser}`, {headers: this.headers});
  }
}