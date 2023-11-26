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

import { User } from '@models/user';
import { Post } from '@models/post';
import { Obj } from '@popperjs/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  modalRef: MdbModalRef<PostmodalComponent> | null = null;
  // userName: string;
  // firstName: string;
  // lastName: string;
  user: User = new User();
  posts: Post[] = [];


  constructor(
    private postService:PostService,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private scrollService: ScrollService,

    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
    ){
      let token: string = this.sessionService.getToken();
      if(!token) {
        this.router.navigate(['landing']);
      }
      else {
        userService.getUserByToken().subscribe((response: Object) => {
          this.user = response;
      })
      }
    }
  
  ngOnInit(): void {
    this.getFeed();
  }

  onScroll() {
    console.log('Scroll event triggered!');
    this.scrollService.loadData();
  }

  // onSubmit(){
  //   this.postService.createPost()
  // }
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
}

