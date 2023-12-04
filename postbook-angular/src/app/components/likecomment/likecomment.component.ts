import { Component, Input, OnInit, OnChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '@services/session.service';
import { PostService } from '@services/post.service';
import { AlbumService } from '@services/album.service';
import { UserService } from '@services/user.service';
import { User } from '@models/user';
import { Album, AlbumImage, AlbumImageLike, AlbumImageComment } from '@models/album';
import { Post, PostComment, PostLike } from '@models/post';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-likecomment',
  templateUrl: './likecomment.component.html',
  styleUrls: ['./likecomment.component.css']
})
export class LikecommentComponent implements OnChanges {
  isLiked: boolean = false;
  likeCount: number = 0;
  likedUsers: string[] = [];
  showLikesDropdown: boolean = false;
  showComments!: boolean;
  user: User = new User();

  constructor(
    private userService: UserService,
    private postService:PostService,
    private albumService: AlbumService,
    private sessionService: SessionService,
    private http: HttpClient,
    private tokenService: TokenService
  ){
    this.tokenService.validateToken();
    
   }

  @Input() post: Post = new Post;
  @Input() albumImage: AlbumImage = new AlbumImage;

  ngOnChanges(): void {
    this.userService.getUserByToken().subscribe( (u: any) => {
      this.user = u;
    });

    if(this.post.id) 
    {
      this.isLiked = this.post.hasLiked!;
    } else if (this.albumImage.id) 
    {
      this.isLiked = this.albumImage.hasLiked!;
    }
  }

  toggleLike() {
    this.isLiked = !this.isLiked;

    let postId = this.sessionService.getPost();
    let albumImageId = this.sessionService.getAlbumImage();
    window.location.reload();
    if(this.post.id || postId) {
      let postLike: PostLike = new PostLike();
      postLike.postId = this.post.id;

      if(!postLike.postId) {
        postLike.postId = postId;
      }
      
      if(this.isLiked) 
      {
        this.postService.addLike(postLike).subscribe();
      } else {
        this.postService.removeLike(postLike.postId!).subscribe();
      }
    } else if (this.albumImage.id || albumImageId) {
        let albumImageLike: AlbumImageLike = new AlbumImageLike();
        albumImageLike.albumImageId = this.albumImage.id;

        if(!albumImageLike.albumImageId) {
          albumImageLike.albumImageId = albumImageId;
        }

        if(this.isLiked) 
        {
          this.albumService.addLike(albumImageLike).subscribe();
        } else {
          this.albumService.removeLike(albumImageLike.albumImageId!).subscribe();
        }
    }
  }

  comment : string = "";
  sendComment() {
    if(this.post.id) {
      let postComment: PostComment = new PostComment();
      postComment.postId = this.post.id;
      postComment.comment = this.comment;

      this.postService.addComment(postComment).subscribe(r => {
        window.location.reload();
        Swal.fire('Comment Successful', 'You have commented on the post', 'success');
      });

    } else if(this.albumImage.id) {
      let albumImageComment: AlbumImageComment = new AlbumImageComment();
      albumImageComment.albumImageId = this.albumImage.id;
      albumImageComment.comment = this.comment;

      this.albumService.addComment(albumImageComment).subscribe(a => {
        Swal.fire('Comment Successful', 'You have commented on the post', 'success');
      })
    }

    this.comment = "";
  }

  toggleLikesDropdown() {
    this.showLikesDropdown = !this.showLikesDropdown;
    this.showComments = false;
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
    this.showLikesDropdown = false;

  } 
}
