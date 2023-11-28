import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PostLikesService } from '@services/post-likes.service';
import { PostLike } from '@models/post';

@Component({
  selector: 'app-postlikelist',
  templateUrl: './postlikelist.component.html',
  styleUrls: ['./postlikelist.component.css']
})
export class PostlikelistComponent {
  postLikes:PostLike[]=[];
  constructor(public modalRef: MdbModalRef<PostlikelistComponent>,    
    private postLikeService:PostLikesService) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  getAllPostLikes(){
    this.postLikeService.getLikes().subscribe((response:any)=>{
      this.postLikes = response;                                                                                                          
    })
  }
}
