import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { PostlikelistComponent } from '@components/postlikelist/postlikelist.component';
import { PostService } from '@services/post.service';
import { Post } from '@models/post';
import { PostComment } from '@models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  modalRef: MdbModalRef<PostlikelistComponent> | null = null
  postId: string = "";
  post: Post = new Post();

  constructor(
    private router: Router,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private postService: PostService
  ){
    let token: string = this.sessionService.getToken();
    if(!token)
    {
      this.router.navigate(['page-not-found']);
    }
    this.postId = this.sessionService.getPost();
    if(!this.postId) {
      Swal.fire('Internal Server Error', 'Something happened lets go back', 'info').then( a => {
        this.router.navigate(['']);
      })
    }
  }

  ngOnInit(): void {
    this.postService.getPost(this.postId).subscribe((p : any)=>{
      
      this.post = p;
    });
  }

  openLikeList() {
    this.modalRef = this.modalService.open(PostlikelistComponent)
  }

  
}
