import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import { Friend, FriendRequest } from '@models/friend';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl: string = 'https://localhost:7185/api/friend';
  private requestUrl: string = 'https://localhost:7185/api/friendRequest';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  // Friend Request
  getFriendRequests() : Observable<FriendRequest[]>{
    return this.http.get<FriendRequest[]>(this.requestUrl + '/allRequest', {headers: this.headers});
  };

  sendFriendRequest(friend: User) : Observable<any> {
    return this.http.post<any>(this.requestUrl + `/request`, friend , {headers: this.headers} )
  }

  acceptFriendRequest(request : FriendRequest) : Observable<any> {
    return this.http.post<any>(this.baseUrl + `/accepted?friendRequestId=${request.id}`,{}, {headers: this.headers})
  }

  // Friend
  getAllFriends() : Observable<Friend[]>{
    return this.http.get<Friend[]>(this.baseUrl + '/userFriendList', {headers: this.headers});
  };

  
}
