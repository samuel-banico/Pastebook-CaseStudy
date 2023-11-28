import { Component, OnInit } from '@angular/core';
import { FriendRequest } from '@models/friend';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FriendService } from '@services/friend.service';
import { User } from '@models/user';
import { DataTransferService } from '@services/data-transfer.service';

@Component({
  selector: 'app-friendrequestmodal',
  templateUrl: './friendrequestmodal.component.html',
  styleUrls: ['./friendrequestmodal.component.css']
})
export class FriendrequestmodalComponent implements OnInit {
  requests: FriendRequest[] = [];

  constructor(
    public modalRef: MdbModalRef<FriendrequestmodalComponent>,
    private friendService: FriendService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) {
    this.getAllFriendRequest();


  }
  
    ngOnInit(): void {
    }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  toProfile(id:string): void {
    this.dataTransferService.data = id;
    console.log(id);
    this.router.navigate(['otherProfile']) 
  }

  getAllFriendRequest(){
    this.friendService.getFriendRequests().subscribe((response: any)=>{
      this.requests = response;
      console.log(this.requests);
    })
  }
  
  accept(request: FriendRequest) {
    this.friendService.acceptFriendRequest(request).subscribe((u:any)=>{
      Swal.fire({
      title: 'New friend alert!',
      text: 'User.name is now your friend',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Visit Profile',
      cancelButtonText: 'Close'
      })
    })
    
    // .then((result) => 
    //     this.router.navigate(['/login']); // Optionally navigate to the login page after logout
    //   }
    // })
    
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
