import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { PostmodalComponent } from '@components/postmodal/postmodal.component';

import { PostService } from '@services/post.service';
import { ScrollService } from '@services/scroll.service';

import { Post } from '@models/post';

import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherwall',
  templateUrl: './otherwall.component.html',
  styleUrls: ['./otherwall.component.css']
})
export class OtherwallComponent {
  modalRef: MdbModalRef<PostmodalComponent> | null = null;
  posts:Post[] = [];
  id: string = "";

  constructor(
    private modalService: MdbModalService,
    private postService: PostService,
    private scrollService: ScrollService,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ){
    this.id = this.sessionService.getUser();
    this.getOtherUserTimeline();
  }

  ngOnInit(): void {
  }

  onScroll() {
    this.scrollService.loadData();
  }

  openModal() {
    this.modalRef = this.modalService.open(PostmodalComponent)
  }

  //GetOwnUserTimeline
  getOtherUserTimeline() {
      this.postService.getOtherUserTimeline(this.id).subscribe((response: any) => {
        console.log(response);
        this.scrollService.initializeData(response);

        this.scrollService.getVisibleData().subscribe((data) => {
          this.posts = data;
        });
      })
    }
  
}