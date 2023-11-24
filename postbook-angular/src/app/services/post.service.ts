import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

//Import Post
import {Post} from '@models/post'

@Injectable({
  providedIn: 'root'
})

export class PostService {

  //Based Url 
  private baseUrl: string = "https://localhost:7185/api/posts"
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })

  post:Post[] = [];
  constructor(
    //To pass data
    private http:HttpClient,
    private sessionService:SessionService
    ) {}
    
    //Add Post
    createPost(post:Post):Observable<Object>{
      return this.http.post(this.baseUrl, post);
    }

    // getUserTimeline():Observable<Object>{
    //   return this.http.get<Post[]>(this.baseUrl + '/otherUserTimeline', { headers: this.headers })
    // };

    getUserTimeline():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseUrl + '/ownUserTimeline',{ headers: this.headers });
    };

    
}
