import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

//Import Post
import {Post, PostComment} from '@models/post'

@Injectable({
  providedIn: 'root'
})

export class PostService {

  //Based Url 
  private baseUrl: string = "https://localhost:7185/api/posts"
  private commentUrl: string = "https://localhost:7185/api/postComment"
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })

  post: Post[] = [];
  comment: PostComment[] = [];
  constructor(
    //To pass data
    private http:HttpClient,
    private sessionService:SessionService
    ) {}
    
    //Add Post
    createPost(post:Post):Observable<Object>{
      return this.http.post(this.baseUrl, post);
    }

    // -- 
    getUserTimeline():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseUrl + '/ownUserTimeline',{ headers: this.headers });
    };

    // --
    getUserFeed():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseUrl + '/allPostsOfFriends', {headers: this.headers})
    };

    addComment(comment:PostComment): Observable<Object>{
      return this.http.post(this.commentUrl + '/commentPost', comment);
    }
}
