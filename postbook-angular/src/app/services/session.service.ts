import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private accessUrl: string = 'https://localhost:7185/api/access';

  constructor(
    private http: HttpClient
  ) {

  }

  getToken() : string {
    return localStorage.getItem('token')!;
  }
  
  setToken(value:string) : void {
    localStorage.setItem('token',value);
  }

  // Remember Me
  getLoginCredentials() : string {
    return localStorage.getItem('rememberMe')!;
  }

  setLoginCredentials(value: string) : void {
    localStorage.setItem('rememberMe',value);
  }

  clear() : void {
    localStorage.removeItem('token');
  }

  clearRememberMe() : void {
    localStorage.removeItem('rememberMe');
  }
}
