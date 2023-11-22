import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Import Post
import {Post} from '@models/post'

@Injectable({
  providedIn: 'root'
})

export class PostService {

  //Based Url 
  private baseUrl: string = "https://localhost:7185/api/posts"
  constructor(
    //To pass data
    private http:HttpClient
    ) {}
    
    //Add Post
    createPost(post:Post):Observable<Object>{
      return this.http.post(this.baseUrl, post);
    }

    
}
