import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditprofilepicmodalComponent } from '@components/editprofilepicmodal/editprofilepicmodal.component';
import { User } from '@models/user';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  profilePicture: string | null = null;
  modalRef: MdbModalRef<EditprofilepicmodalComponent> | null = null;

  // New properties for editable bio
  isEditingBio = false;
  editedBio: string = ''; // Initialize with an empty string

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {
    let token: string = this.sessionService.getToken();
    if (!token) {
      this.router.navigate(['page-not-found']);
    } else {
      this.userService.getUserByToken().subscribe((response: any) => {
        this.user = response;
        console.log(response);
      });
    }
  }

  ngOnInit(): void {}

  showTimeLine: boolean = true;
  showFriends: boolean = false;
  showAlbums: boolean = false;

  displayTimeline(): void {
    this.showTimeLine = true;
    this.showFriends = false;
    this.showAlbums = false;
  }

  displayFriends(): void {
    this.showTimeLine = false;
    this.showFriends = true;
    this.showAlbums = false;
  }

  displayAlbums(): void {
    console.log('albums');
    this.showTimeLine = false;
    this.showFriends = false;
    this.showAlbums = true;
  }

  showOverlay() {
    const overlay = document.querySelector('.overlay') as HTMLElement | null;
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  hideOverlay() {
    const overlay = document.querySelector('.overlay') as HTMLElement | null;
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  changeImage() {
    // Your existing code for changing the image
    this.modalRef = this.modalService.open(EditprofilepicmodalComponent);
  }

  // New methods for editable bio
  startEditingBio() {
    this.isEditingBio = true;
    this.editedBio = this.user.userBio || ''; // Initialize with the current user bio or an empty string
  }

  saveEditedBio() {
    // Save the edited bio to the user object or perform any necessary actions

    console.log(this.editedBio);
    this.isEditingBio = false;

    this.userService.editBio(this.editedBio).subscribe(response => {
      console.log('bio changed');
    });
  }
}
