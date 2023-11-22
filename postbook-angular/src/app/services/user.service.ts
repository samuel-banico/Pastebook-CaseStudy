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

  getUser(id: number) : Observable<Object>{
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  update(user: User): Observable<Object> {
    let userId: number = Number.parseInt(this.session.getId());
    return this.http.put(this.baseUrl + `/${userId}`, user);
  }
}
