import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7185/api/users';
  
  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<object> {
    return this.http.post(this.baseUrl + '/login', {email, password});
  }

  register(user: User): Observable<object> {
    return this.http.post(this.baseUrl + '/register', user);
  }

  getUser(id: number) : Observable<Object>{
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  update(user: User): Observable<Object> {
    return this.http.put(this.baseUrl + `/${user.id}`, user);
  }
}