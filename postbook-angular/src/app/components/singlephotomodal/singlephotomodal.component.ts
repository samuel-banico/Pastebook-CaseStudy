import { Component, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-singlephotomodal',
  templateUrl: './singlephotomodal.component.html',
  styleUrls: ['./singlephotomodal.component.css']
})
export class SinglephotomodalComponent {
  showComments = false;

  // Mock comments data, replace with your actual data
  comments = [
    { user: 'Dingdong Dentist', text: 'kamukha ni christian deyto hehe yung anak ni rey untal' }
  ];

  toggleLike() {
    // Add your logic for liking
    console.log('Liked!');
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
  }
}