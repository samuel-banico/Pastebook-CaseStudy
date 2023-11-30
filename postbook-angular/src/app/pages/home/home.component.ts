import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PostmodalComponent } from '@components/postmodal/postmodal.component';

import { PostService } from '@services/post.service';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';
import { ScrollService } from '@services/scroll.service';
import { TokenService } from '@services/token.service';
import { PostLikesService } from '@services/post-likes.service';
import { DataTransferService } from '@services/data-transfer.service';

import { User } from '@models/user';
import { Post, PostLike, PostComment } from '@models/post';
import { Obj } from '@popperjs/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  modalRef: MdbModalRef<PostmodalComponent> | null = null;

  user: User = new User();

  posts: Post[] = [];

  postLikes:PostLike[]=[];

  postId?:string = '';
  userId?:string = '';

  postLiked:PostLike = new PostLike();
  comment: PostComment = new PostComment();

  constructor(
    private postService:PostService,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private scrollService: ScrollService,
    private tokenService: TokenService,
    private dataTransfer: DataTransferService,
    private postLikeService:PostLikesService,

    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
    ){
      this.tokenService.validateToken();
      userService.getUserByTokenHome().subscribe((response: Object) => {
        this.user = response;
    }, (err : any) => {
      if(err['error']['result'] === 'no_user') {
        Swal.fire('Internal Server Error', 'There was an issue in the server. Returning to Login', 'warning');
          this.router.navigate(['login']);
      }
    })
  } 
  
ngOnInit(): void {
  this.getFeed();
}

onScroll() {
  this.scrollService.loadData();
}

onComment(){
  this.postService.addComment(this.comment).subscribe((response: Record<string, any>)=>{
    Swal.fire('Comment', 'Test', 'success');
  });
}

openModal() {
  this.modalRef = this.modalService.open(PostmodalComponent)
}

  getFeed(){
    this.postService.getUserFeed().subscribe((response: Post[]) =>{
      this.scrollService.initializeData(response);

      this.scrollService.getVisibleData().subscribe((data) => {
        this.posts = data;
      });
    }); 
  }

  //Get all Post Likes
  getAllPostLikes(){
    this.postLikeService.getLikes().subscribe((response:any)=>{
      this.postLikes = response;                                                                                                          
    })
  }

  onPostClick(clickedPost: Post){
    this.sessionService.setPost(clickedPost.id!);
    this.router.navigate(['post/'+clickedPost.id]); 
  }

  onFriendClick(clickedFriend:User){
    this.router.navigate(["Profile/"+clickedFriend.firstName + "_" + clickedFriend.lastName]);
  }
  //PostLiked
  // createLikedPost(){
  //   this.postLikeService.likedPost(this.postId?,this.userId?).subscribe((response:any)=>{
  //     this.postLikes = response;
  //   })
  // }
}
