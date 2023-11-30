import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

//Import Post
import {Post, PostComment, PostLike} from '@models/post'

@Injectable({
  providedIn: 'root'
})

export class PostService {

  //Based Url 
  private baseUrl: string = "https://localhost:7185/api/posts";
  private commentUrl: string = "https://localhost:7185/api/postComment";
  private likeUrl: string = "https://localhost:7185/api/postLike"
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

    //Get Single Post
    getPost(id: string):Observable<Object>{
      return this.http.get<any>(this.baseUrl + `?postId=${id}`, {headers: this.headers});
    }
    
    // -- 
    getUserTimeline():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseUrl + '/ownUserTimeline',{ headers: this.headers });
    };

    getOtherUserTimeline(retreiveId: string): Observable<object> {
      console.log(retreiveId);
      const params = new HttpParams()
        .set('retrievedUserId', retreiveId);

      return this.http.get<Post[]>(this.baseUrl + `/otherUserTimeline`, { headers: this.headers, params});
    }

    // --
    getUserFeed():Observable<Post[]>{
      return this.http.get<Post[]>(this.baseUrl + '/allPostsOfFriends', {headers: this.headers})
    };

    // Comments
    addComment(postComment: PostComment): Observable<Object>{      
      return this.http.post(this.commentUrl + '/commentPost', postComment, { headers: this.headers});
    };

    getComments(): Observable<PostComment[]>{
      return this.http.get<PostComment[]>(this.commentUrl + 'allPostComments', {headers: this.headers})
    };

    //Likes
    addLike(postLike: PostLike): Observable<Object>{  
      console.log("a");    
      return this.http.post(this.likeUrl + '/likePost', postLike, { headers: this.headers});
    };

    removeLike(postId: string): Observable<Object>{  
      const params = new HttpParams()
        .set('postId', postId);

      return this.http.delete(this.likeUrl + '/unlikePost', { params: params});
    };
}
