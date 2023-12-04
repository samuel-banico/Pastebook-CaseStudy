import { Component, OnInit, OnDestroy  } from '@angular/core';
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
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private refreshInterval!: Subscription;
  modalRef: MdbModalRef<PostmodalComponent> | null = null;

  user: User = new User();
  posts: Post[] = [];
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
      this.userService.getUserByTokenHome().subscribe((response: Object) => {
        this.user = response;
    }, (err : any) => {
      if(err['error']['result'] === 'no_user') {
        Swal.fire('Internal Server Error', 'There was an issue in the server. Returning to Login', 'warning');
          this.router.navigate(['login']);
      }
    })
  } 
  
  ngOnInit(): void {
    this.getFeed(); // Initial data fetch
    this.setupAutoRefresh();
    
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  private setupAutoRefresh(): void {
    const refreshTimeInSeconds = 60; // Adjust the refresh interval as needed (e.g., every 60 seconds)
    
    this.refreshInterval = interval(refreshTimeInSeconds * 1000).subscribe(() => {
      this.getFeed(); // Fetch data at regular intervals
    });
  }

onScroll() {
  this.scrollService.loadData();
}

postModal() {
  this.modalRef = this.modalService.open(PostmodalComponent)
}

  getFeed(){
    this.postService.getUserFeed().subscribe((response: Post[]) =>{
      this.scrollService.initializeData(response);

      this.scrollService.getVisibleData().subscribe((data) => {
        this.posts = data;
        console.log(data);
        console.log(this.posts);
      });
    }); 
  }

  onPostClick(clickedPost: Post){
    this.sessionService.setPost(clickedPost.id!);
    this.router.navigate(['post/'+clickedPost.id]); 
  }

  onFriendClick(clickedFriend:User){
    this.sessionService.setUser(clickedFriend.id!);
    let uniqueId = (clickedFriend.firstName!+clickedFriend.lastName!+clickedFriend.salt!).replace(/\s/g, '');
    this.router.navigate(["Profile/"+uniqueId]);
  }
 // Function to check if the clicked user is the currently logged-in user
isCurrentUser(user: User | undefined): boolean {
  return !!user && !!this.user && user.id === this.user.id;
}

// Function to handle user click
onUserClick(clickedUser: User | undefined): void {
  if (clickedUser && this.isCurrentUser(clickedUser)) {
    // Redirect to a different route for the user's own profile
    let uniqueId = (this.user.firstName!+this.user.lastName!+this.user.salt!).replace(/\s/g, '');
    this.router.navigate(['YourProfile/'+uniqueId])
  } else if (clickedUser) {
    // Handle the logic for other users' profiles
    this.onFriendClick(clickedUser);
  }
}


  
}
