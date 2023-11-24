import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import { FriendRequest } from '@models/friend';
import { Friend } from '@models/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  request: FriendRequest[] = [];

  private baseUrl: string = 'https://localhost:7185/api/friend';
  private requestUrl: string = 'https://localhost:7185/api/friendRequest';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getFriendRequests() : Observable<FriendRequest[]>{
    return this.http.get<FriendRequest[]>(this.requestUrl + '/allRequest', {headers: this.headers});
  };

  getAllFriends() : Observable<Friend[]>{
    return this.http.get<Friend[]>(this.baseUrl + '/userFriendList', {headers: this.headers});
  };
}
