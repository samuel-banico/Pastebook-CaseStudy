import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post.service';
import { Post } from '@models/post';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {

  posts:Post[] = [];

  constructor(
    private postService:PostService,
  ){
    //this.getOwnUserTimeline();
  }


  //posts:Post = new Post();

  ngOnInit(): void {
    this.getOwnUserTimeline();
  }

  //GetOwnUserTimeline
  getOwnUserTimeline() {
      this.postService.getUserTimeline().subscribe((response: any) => {
        this.posts = response;
        console.log(response);
      })
    }
  
}
