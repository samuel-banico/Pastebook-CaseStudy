import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post.service';
import { Post } from '@models/post';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {
  constructor(
    private postService:PostService,
    private sessionService:SessionService
  ){
    this.getOwnUserTimeline();
  }

  posts:Post = new Post();
  ngOnInit(): void {
    
  }

  //GetOwnUserTimeline
  getOwnUserTimeline() {
    this.postService.getUserTimeline().subscribe((response: Object) => {
      this.posts = response;
    })
  }
}
