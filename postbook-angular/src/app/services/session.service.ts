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

  clearSearchUser():void{
    localStorage.removeItem('search');
  }

  clearUser():void{
    localStorage.removeItem('user');
  }

  clearPost():void{
    localStorage.removeItem('post');
  }

  clearAlbum():void{
    localStorage.removeItem('album');
  }

  // Temp Storage
  setSearchUser(value: string): void {
    sessionStorage.setItem('search',value);
  }

  setUser(value: string): void {
    sessionStorage.setItem('user',value);
  }

  setPost(value: string): void {
    sessionStorage.setItem('post',value);
  }

  setAlbum(value: string): void {
    sessionStorage.setItem('album',value);
  }

  getSearchUser(): string {
    return sessionStorage.getItem('search')!;
  }

  getUser(): string {
    return sessionStorage.getItem('user')!;
  }

  getPost(): string {
    return sessionStorage.getItem('post')!;
  }

  getAlbum(): string {
    return sessionStorage.getItem('album')!;
  }
}
