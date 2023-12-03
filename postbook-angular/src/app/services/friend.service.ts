import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

import { Friend, FriendRequest } from '@models/friend';
import { User } from '@models/user';
import { Album } from '@models/album';

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
  getFriendRequests() : Observable<object>{
    return this.http.get(this.requestUrl + '/allRequest', {headers: this.headers});
  };

  sendFriendRequest() : Observable<any> {
    let id = this.sessionService.getUser();

    return this.http.post<any>(this.requestUrl + `/request?Id=${id}`, {} , {headers: this.headers} )
  }

  acceptFriendRequest(request : FriendRequest) : Observable<any> {
    return this.http.post<any>(this.baseUrl + `/accepted?friendRequestId=${request.id}`,{}, {headers: this.headers})
  }

  rejectFriendRequest(request : FriendRequest) : Observable<any> {
    const params = new HttpParams()
        .set('friendRequestId', request.id!);

    return this.http.delete<any>(this.requestUrl + `/reject`, {params: params})
  }

  hasSentFriendRequest(friendId : string) : Observable<any> {
    const params = new HttpParams()
        .set('userToken', this.sessionService.getToken())
        .set('friendId', friendId);

    return this.http.get(this.requestUrl + '/sentRequest', {params})
  }

  // Friend
  getAllFriends(userId : string, use : string) : Observable<Friend[]>{
    const params = new HttpParams()
        .set('userId', userId)
        .set('use', use);

    console.log(userId);
    return this.http.get<Friend[]>(this.baseUrl + '/userFriendList', {params});
  };

  isFriends(friendId : string) : Observable<any> {
    const params = new HttpParams()
        .set('userToken', this.sessionService.getToken())
        .set('friendId', friendId);

    return this.http.get(this.baseUrl + '/friend', {params})
  }
  
}
