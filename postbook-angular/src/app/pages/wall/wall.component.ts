import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { PostmodalComponent } from '@components/postmodal/postmodal.component';

import { PostService } from '@services/post.service';
import { ScrollService } from '@services/scroll.service';
import { UserService } from '@services/user.service';

import { Post } from '@models/post';
import { User } from '@models/user';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {
  modalRef: MdbModalRef<PostmodalComponent> | null = null;
  posts:Post[] = [];
  user: User = new User();

  constructor(
    private modalService: MdbModalService,
    private postService: PostService,
    private scrollService: ScrollService,
    private userService: UserService,
    private tokenService: TokenService
  ){
    this.tokenService.validateToken();
    
    this.userService.getUserByToken().subscribe((r: any) => {
      this.user = r;
    });
  }


  //posts:Post = new Post();

  ngOnInit(): void {
    this.getOwnUserTimeline();
  }

  onScroll() {
    this.scrollService.loadData();
  }

  openModal() {
    this.modalRef = this.modalService.open(PostmodalComponent)
  }

  //GetOwnUserTimeline
  getOwnUserTimeline() {
      this.postService.getUserTimeline().subscribe((response: any) => {
        this.scrollService.initializeData(response);

        this.scrollService.getVisibleData().subscribe((data) => {
          this.posts = data;
        });
      })
    }
  
}
