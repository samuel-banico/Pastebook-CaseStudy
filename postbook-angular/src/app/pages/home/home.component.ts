import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostmodalComponent } from '@components/postmodal/postmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  modalRef: MdbModalRef<PostmodalComponent> | null = null;

  constructor(
    private postService:PostService,
    private modalService: MdbModalService
    ){}
  
  ngOnInit(): void {}

  // onSubmit(){
  //   this.postService.createPost()
  // }

  openModal() {
    this.modalRef = this.modalService.open(PostmodalComponent)
  }
}

