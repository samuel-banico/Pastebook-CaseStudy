import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { PostLike } from '@models/post';

@Injectable({
  providedIn: 'root'
})
export class PostLikesService {
//Based Url 
private baseUrl: string = "https://localhost:7185/api/postLike"
private headers: HttpHeaders = new HttpHeaders({
  'Authorization': `${this.sessionService.getToken()}`
})

postLikes:PostLike[] = [];
  constructor(
    private http:HttpClient,
    private sessionService:SessionService,
    
  ) { }

  //Add PostLikes <3
  likedPost(postId:string,userId:string){
    return this.http.put(this.baseUrl + 'likePost',{postId,userId},{ headers: this.headers })
  }

  //getAllPostLikes
  getLikes():Observable<PostLike[]>{
    return this.http.get<PostLike[]>(this.baseUrl + 'allPostLike',{ headers: this.headers })
  };
}
