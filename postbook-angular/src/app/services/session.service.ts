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

  // Session Storage
  clearSearchUser():void{
    sessionStorage.removeItem('search');
  }

  clearUser():void{
    sessionStorage.removeItem('user');
  }

  clearPost():void{
    sessionStorage.removeItem('post');
  }

  clearAlbum():void{
    sessionStorage.removeItem('album');
  }

  clearAlbumImage():void{
    sessionStorage.removeItem('image');
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

  setAlbumImage(value: string): void {
    sessionStorage.setItem('image', value);
  }

  setShowProfileTab(showTimeLine: string, showFriends: string, showAlbums: string): void {
    sessionStorage.setItem('show-timeline', showTimeLine);
    sessionStorage.setItem('show-friends', showFriends);
    sessionStorage.setItem('show-albums',showAlbums)
  }

  getTimelineTab(): string {
      return sessionStorage.getItem('show-timeline')!;
  }

  getFriendsTab(): string {
    return sessionStorage.getItem('show-friends')!;
  }

  getAlbumsTab(): string {
    return sessionStorage.getItem('show-albums')!;
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

  getAlbumImage(): string {
    return sessionStorage.getItem('image')!;
  }
}
