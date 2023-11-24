import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
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
  ) { }

  //Get All Notification
  getAllNotif():Observable<Notification[]>{
    return this.http.get<Notification[]>(this.baseUrl + '/allNotification',{ headers: this.headers })
  };

  //Get Unseen Notification
  getUnseenNotif():Observable<Notification[]>{
    return this.http.get<Notification[]>(this.baseUrl + '/unseenNotification', {headers: this.headers })
  }

  //Update notification to hasSeen = true
  updateSeenNotification(notif:Notification):Observable<Object>{
    return this.http.put<Notification[]>(this.baseUrl,notif,{ headers: this.headers });
  }

}
