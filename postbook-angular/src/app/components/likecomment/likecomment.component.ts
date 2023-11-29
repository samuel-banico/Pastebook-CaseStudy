import { Component } from '@angular/core';

@Component({
  selector: 'app-likecomment',
  templateUrl: './likecomment.component.html',
  styleUrls: ['./likecomment.component.css']
})
export class LikecommentComponent {
  isLiked: boolean = false;
  likeCount: number = 0;
  likedUsers: string[] = [];
  showLikesDropdown: boolean = false;
  userImage: string = '../../../assets/images/user-default-image.png'; // Replace with the actual path to the default user image
  showComments!: boolean;

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.likeCount++;
      this.likedUsers.push('User Name'); // Add the name of the user who liked the post
    } else {
      this.likeCount--;
      this.likedUsers.pop(); // Remove the last user from the list
    }
  }

  openComment() {
    // Add your logic to handle opening comments here
  }

  toggleLikesDropdown() {
    this.showLikesDropdown = !this.showLikesDropdown;
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
  } 
}
