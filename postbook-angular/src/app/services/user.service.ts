import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7185/api/users';
  private accessUrl: string = 'https://localhost:7185/api/access';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })

  constructor(
    private http: HttpClient,
    private sessionService : SessionService
  ) {}

  // --- Access Controller
  login(email: string, password: string): Observable<object> {

    return this.http.post(this.accessUrl + '/login', {email, password});
  }

  logout() : Observable<object> 
  {
    return this.http.delete(this.accessUrl + `/logout`, { headers: this.headers });
  }

  register(user: User): Observable<object> {
    return this.http.post(this.accessUrl + '/register', user);
  }

  validateToken() : Observable<boolean> {
    console.log('r');
    return this.http.get<boolean>(this.accessUrl + `/validateToken`, {headers: this.headers});
  }

  // --- User Controller
  getUserByToken() : Observable<Object>{
    return this.http.get<any>(this.baseUrl + `/userIdFromToken`, {headers: this.headers});
  }

  getUserById(id: string) : Observable<Object>{
    return this.http.get<any>(this.baseUrl + `/${id}`);
  }

  updateGeneral(user: User): Observable<Object> {
    return this.http.put<User>(this.baseUrl + `/editUserGeneral`, user, {headers: this.headers});
  }

  updateSecurity(user: User): Observable<Object> {
    return this.http.put<User>(this.baseUrl + `/editUserSecurity?id=${user.id}`, user, {headers: this.headers});
  }

  editUserSecurityVerifyPassword(pass: string) : Observable<object> 
  { 
    return this.http.get(this.baseUrl+ `/getPassword?password=${pass}`, { headers: this.headers } )
  }
}
