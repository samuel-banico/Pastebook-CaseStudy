import { Component, Input } from '@angular/core';

import { PostService } from '@services/post.service'; 
import { Post, PostComment, PostLike } from '@models/post';
import { User } from '@models/user';
import Swal from 'sweetalert2';
import { Album } from '@models/album';

import { UserService } from '@services/user.service';
@Component({
  selector: 'app-likecomment',
  templateUrl: './likecomment.component.html',
  styleUrls: ['./likecomment.component.css']
})
export class LikecommentComponent {
  isLiked: boolean = false;
  likeCount: number = 0;
  likedUsers: string[] = [];
  showLikesDropdown: boolean = false;
  showComments!: boolean;

  constructor(
    private userService: UserService,
    private postService:PostService,

  ){}

  @Input() user: User = new User();
  @Input() post: Post = new Post();
  @Input() album: Album = new Album();


  toggleLike() {
    if(this.post) {
      let postLike: PostLike = new PostLike();
      postLike.postId = this.post.id;
      
      this.postService.addLike(postLike).subscribe();
    } else if (this.album) {

    }
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.likeCount++;
      this.likedUsers.push('User Name'); // Add the name of the user who liked the post
    } else {
      this.likeCount--;
      this.likedUsers.pop(); // Remove the last user from the list
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
  }

  toggleLikesDropdown() {
    this.showLikesDropdown = !this.showLikesDropdown;
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
  } 
}
