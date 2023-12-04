import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { PostService } from '@services/post.service';
import { SessionService } from '@services/session.service';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';

import { PostlikelistComponent } from '@components/postlikelist/postlikelist.component';

import { Post } from '@models/post';
import { PostComment } from '@models/post';
import { User } from '@models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  modalRef: MdbModalRef<PostlikelistComponent> | null = null
  postId: string = "";
  post: Post = new Post();
  user: User = new User();

  constructor(
    private router: Router,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private postService: PostService,
    private tokenService: TokenService,
    private userService: UserService
  ){
    this.tokenService.validateToken();

    this.postId = this.sessionService.getPost();
    if(!this.postId) {
      Swal.fire('Internal Server Error', 'Something happened lets go back', 'info').then( a => {
        this.router.navigate(['']);
      })
    }

    this.userService.getUserByToken().subscribe( (r:any) => {
      this.user = r;
    })

    this.getPost();
  }

  ngOnInit(): void { 
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe((p : any)=>{
      this.post = p;
    });
  }

  openLikeList() {
    this.modalRef = this.modalService.open(PostlikelistComponent)
  }

  isCurrentUser(user: User | undefined): boolean {
    return !!user && !!this.user && user.id === this.user.id;
  }

  onUserClick(clickedUser: User | undefined): void {
    console.log(clickedUser);
    if (clickedUser && this.isCurrentUser(clickedUser)) {
      this.sessionService.setUser(clickedUser.id!)
      // Redirect to a different route for the user's own profile
      let uniqueId = (clickedUser.firstName!+clickedUser.lastName!+clickedUser.salt!).replace(/\s/g, '');
      this.router.navigate(['YourProfile/'+uniqueId])
    } else if (clickedUser) {
      // Handle the logic for other users' profiles
      this.onFriendClick(clickedUser);
    }
  }

  onFriendClick(clickedFriend:User){
    this.sessionService.setUser(clickedFriend.id!);
    let uniqueId = (clickedFriend.firstName!+clickedFriend.lastName!+clickedFriend.salt!).replace(/\s/g, '');
    this.router.navigate(["Profile/"+uniqueId]);
  }
  
}
