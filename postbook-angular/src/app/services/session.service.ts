import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  @Output() hasToken : EventEmitter<boolean> = new EventEmitter();
  constructor() {
    if(localStorage.getItem('token')!== null){
      this.hasToken.emit(true);
    } else {
      this.hasToken.emit(false);
    }
  }

  getToken() : string {
    return localStorage.getItem('token')!;
  }
  
  setToken(value:string) : void {
    this.hasToken.emit(true);
    localStorage.setItem('token',value);
  }

  clear() : void {
    localStorage.clear();
    this.hasToken.emit(false);
  }
}
