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
  private httpHeaders:HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${this.sessionService.getToken()}`
  })
  constructor(
    //To pass data
    private http:HttpClient,
    private sessionService:SessionService
    ) {}
    
    //Add Post
    createPost(post:Post):Observable<Object>{
      return this.http.post(this.baseUrl, post);
    }

    getUserTimeline(id:string):Observable<Object>{
      return this.http.get<Post[]>(this.baseUrl + '/otherUserTimeline', {headers:this.httpHeaders})
    };

    
}
