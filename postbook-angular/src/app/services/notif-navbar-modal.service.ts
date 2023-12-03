import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

//Import Notification
import { Notification } from '@models/notification';


@Injectable({
  providedIn: 'root'
})
export class NotifNavbarModalService {  
//Based Url 
private baseUrl: string = "https://localhost:7185/api/notif"
private headers: HttpHeaders = new HttpHeaders({
  'Authorization': `${this.sessionService.getToken()}`
})

notifs:Notification[] = [];  

constructor(
    private http:HttpClient,
    private sessionService:SessionService

  ) {  
}
  //Get Unseen Notification
  getUnseenNotif():Observable<Notification[]>{
    return this.http.get<Notification[]>(this.baseUrl + '/unseenNotification', {headers: this.headers })
  }

  //Update notification to hasSeen = true
  updateSeenNotification(notifId: string):Observable<Object>{
    const params = new HttpParams()
      .set('notifId', notifId);

    return this.http.put<Notification[]>(this.baseUrl, {}, { headers: this.headers, params: params });
  }

  //Clear Notification
  clearNotif():Observable<Notification[]>{
    console.log(this.sessionService.getToken());
    return this.http.put<Notification[]>(this.baseUrl + `/clearNotification`,{} ,{headers:this.headers})
  }

}
