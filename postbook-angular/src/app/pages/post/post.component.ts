import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostlikelistComponent } from '@components/postlikelist/postlikelist.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  modalRef: MdbModalRef<PostlikelistComponent> | null = null

  constructor(
    private router: Router,
    private modalService: MdbModalService

  )
  { }

    openLikeList() {
      this.modalRef = this.modalService.open(PostlikelistComponent)
    }
  }
