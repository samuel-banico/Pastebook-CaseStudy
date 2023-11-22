import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7185/api/users';
  private accessUrl: string = 'https://localhost:7185/api/access';


  constructor(
    private http: HttpClient,
    private session : SessionService
  ) {}

  login(email: string, password: string): Observable<object> {
    return this.http.post(this.accessUrl + '/login', {email, password});
  }

  register(user: User): Observable<object> {
    return this.http.post(this.accessUrl + '/register', user);
  }

  getUser(id: string) : Observable<Object>{
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  updateGeneral(user: User): Observable<Object> {
    user.id = this.session.getId();
    return this.http.put(this.baseUrl + `/editUserGeneral?id=${user.id}`, user);
  }

  updateSecurity(user: User): Observable<Object> {
    user.id = this.session.getId();
    return this.http.put(this.baseUrl + `/editUserSecurity?id=${user.id}`, user);
  }

  editUserSecurityVerifyPassword(pass: string) : Observable<object> 
  { 
    let params = {
      id: this.session.getId(),
      password: pass
    };

    return this.http.get(this.baseUrl+ `/getPassword`, { params })
  }
}
