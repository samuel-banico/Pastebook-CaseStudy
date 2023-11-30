import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { PostService } from '@services/post.service';
import { UserService } from '@services/user.service';
import { Post } from '@models/post';
import { User } from '@models/user';
import { SessionService } from '@services/session.service';

// ... Existing imports ...

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.css']
})
export class PostmodalComponent {
  post: Post = new Post();
  user: User = new User();
  selectedPrivacy: string = 'Public';

  constructor(
    public modalRef: MdbModalRef<PostmodalComponent>,
    private postService: PostService,
    private userService: UserService,
    private sessionService:SessionService
  ) {
    userService.getUserByToken().subscribe((response: Object) => {
      this.user = response as User;
    });
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  onPrivacySelect(): void {
    console.log('Selected privacy:', this.selectedPrivacy);
  }

  onPost(): void {
    console.log('Post content:', this.post.content);
    console.log('Selected privacy:', this.selectedPrivacy);

    // Add your logic to post the content with the selected privacy
    // Example: Update the 'isPublic' property based on the selected privacy
    this.post.isPublic = this.selectedPrivacy === 'Public';
    let friend = this.sessionService.getUser();
    if(friend){
      this.post.userId = friend;
      this.post.friendId = this.user.id;
    }else{
      this.post.userId = this.user.id;
    }
    this.postService.createPost(this.post).subscribe((response: Record<string, any>) => {
      if (response['result'] === 'new_post') {
        Swal.fire('Posted', 'Your status was posted', 'success');
        this.close(); // Close the modal after posting
      }
    });
  }
}
