import { Component, OnInit } from '@angular/core';
import { FriendRequest } from '@models/friend';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { FriendService } from '@services/friend.service';

@Component({
  selector: 'app-friendrequestmodal',
  templateUrl: './friendrequestmodal.component.html',
  styleUrls: ['./friendrequestmodal.component.css']
})
export class FriendrequestmodalComponent implements OnInit {
  requests: FriendRequest[] = [];

  constructor(
    public modalRef: MdbModalRef<FriendrequestmodalComponent>,
    private friendService: FriendService
  ) {}
  
    ngOnInit(): void {
      this.getFriendRequest();
    }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  getFriendRequest(){
    this.friendService.getFriendRequests().subscribe((response: FriendRequest[])=>{
      this.requests = response;
    })
  }
  
  Accept(): void {
    Swal.fire({
      title: 'New friend alert!',
      text: 'User.name is now your friend',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Visit Profile',
      cancelButtonText: 'Close'
    })
    // .then((result) => 
    //     this.router.navigate(['/login']); // Optionally navigate to the login page after logout
    //   }
    // })
    ;
  }

  Reject(): void {
    Swal.fire({
      title: 'Friend request rejected',
      text: 'You rejected user.name friend request',
      icon: 'error',
      // confirmButtonText: 'Yes, logout!',
    })
    // .then((result) => 
    //     this.router.navigate(['/login']); // Optionally navigate to the login page after logout
    //   }
    // })
    ;
  }
}
