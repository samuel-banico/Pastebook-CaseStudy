import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarcountService {
  private notificationCountSubject = new BehaviorSubject<number>(0);
  notificationCount$ = this.notificationCountSubject.asObservable();

  private friendRequestCountSubject = new BehaviorSubject<number>(0);
  friendRequestCount$ = this.friendRequestCountSubject.asObservable();

  constructor() { }

  updateNotificationCount(count: number) {
    this.notificationCountSubject.next(count);
  }

  updateFriendRequestCount(count: number) {
    this.friendRequestCountSubject.next(count);
  }
}
