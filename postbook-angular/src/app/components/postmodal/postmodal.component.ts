import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { PostService } from '@services/post.service';
import { SessionService } from '@services/session.service';
import { Post } from '@models/post';
import { UserService } from '@services/user.service';
import { User } from '@models/user';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.css']
})
export class PostmodalComponent implements OnInit{
  post: Post = new Post();
  user: User = new User();

  constructor(
    public modalRef: MdbModalRef<PostmodalComponent>,
    private postService: PostService,
    private userService: UserService,
    private sessionService: SessionService
    ) {
      userService.getUserByToken().subscribe((response: Object)=>{
        this.user = response;
      })
    }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  selectedOption = 'Public';
  onOptionSelect(option: string) {
    this.selectedOption = option;
  }

  ngOnInit(): void {}
  onPost() {
    console.log(this.post);
    if (this.selectedOption == 'Public'){
      this.post.isPublic = true;
    } else {
      this.post.isPublic = false;
    }
    this.post.userId = this.user.id;
    this.postService.createPost(this.post).subscribe((response: Record<string, any>)=>{
      if(response['result']==='new_post'){
        Swal.fire('Posted','Your status was posted','success');
      }
    })
  }
}
