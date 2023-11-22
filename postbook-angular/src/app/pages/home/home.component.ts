import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostmodalComponent } from '@components/postmodal/postmodal.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';
import { User } from '@models/user';
import { Post } from '@models/post';
import Swal from 'sweetalert2';

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

  constructor(
    private postService:PostService,
    private modalService: MdbModalService,
    private httpClient: HttpClient,
    private userService: UserService,
    private sessionService: SessionService

    ){
      let userId: number = this.sessionService.getId();
      userService.getUser(userId).subscribe((response: Object)=>{
        this.user = response;
      })
    }
  
  ngOnInit(): void {}

  // onSubmit(){
  //   this.postService.createPost()
  // }

  openModal() {
    this.modalRef = this.modalService.open(PostmodalComponent)
  }
 
}

