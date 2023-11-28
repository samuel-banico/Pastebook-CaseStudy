import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { PostlikelistComponent } from '@components/postlikelist/postlikelist.component';
import { PostService } from '@services/post.service';
import { PostComment } from '@models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  modalRef: MdbModalRef<PostlikelistComponent> | null = null

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
  }

  ngOnInit(): void {
    
  }

  openLikeList() {
    this.modalRef = this.modalService.open(PostlikelistComponent)
  }

}
