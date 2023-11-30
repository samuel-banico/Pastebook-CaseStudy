import { Component, Input, OnInit } from '@angular/core';

import { PostService } from '@services/post.service'; 
import { Post, PostComment, PostLike } from '@models/post';
import { User } from '@models/user';
import Swal from 'sweetalert2';
import { Album } from '@models/album';

import { SessionService } from '@services/session.service';

import { UserService } from '@services/user.service';
@Component({
  selector: 'app-likecomment',
  templateUrl: './likecomment.component.html',
  styleUrls: ['./likecomment.component.css']
})
export class LikecommentComponent implements OnInit {
  isLiked: boolean = false;
  likeCount: number = 0;
  likedUsers: string[] = [];
  showLikesDropdown: boolean = false;
  showComments!: boolean;

  constructor(
    private userService: UserService,
    private postService:PostService,
    private sessionService: SessionService

  ){ }

  @Input() user: User = new User();
  @Input() post: Post = new Post();
  @Input() album: Album = new Album();

  ngOnInit(): void {
    this.isLiked = this.post.hasLiked!;
    console.log(this.isLiked);
  }

  toggleLike() {
    this.isLiked = !this.isLiked;

    let postId = this.sessionService.getPost();
    if(this.post || postId) {
      let postLike: PostLike = new PostLike();
      postLike.postId = this.post.id;

      if(!postLike.postId) {
        postLike.postId = postId;
      }
      
      if(this.isLiked) 
      {
        this.postService.addLike(postLike).subscribe();
      } else {
        this.postService.removeLike(this.post.id!).subscribe();
      }
    } else if (this.album) {

    }
  }

  comment : string = "";
  sendComment() {
    if(this.post) {
      let postComment: PostComment = new PostComment();
      postComment.postId = this.post.id;
      postComment.comment = this.comment;

      this.postService.addComment(postComment).subscribe();
    } else if(this.album) {

    }

    this.comment = "";
  }

  toggleLikesDropdown() {
    console.log(this.showLikesDropdown);
    this.showLikesDropdown = !this.showLikesDropdown;
    this.showComments = false;
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
    this.showLikesDropdown = false;

  } 
}
