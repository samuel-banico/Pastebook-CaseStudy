import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FriendService } from '@services/friend.service';
import { SessionService } from '@services/session.service';

import { User } from '@models/user';
import { FriendRequest } from '@models/friend';
import { TokenService } from '@services/token.service';


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
    private sessionService: SessionService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.tokenService.validateToken();

    this.getAllFriendRequest();
  }
  
    ngOnInit(): void {
    }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  toProfile(clickedUser: User): void {
    this.sessionService.setUser(clickedUser.id!);
    console.log(clickedUser);
    this.close();
    let uniqueId = (clickedUser.firstName!+clickedUser.lastName!+clickedUser.salt!).replace(/\s/g, '');
    this.router.navigate(["Profile/" + uniqueId]).then(()=>{
      window.location.href = "Profile/" + uniqueId;
    });
  }

  getAllFriendRequest(){
    this.friendService.getFriendRequests().subscribe((response: any)=>{
      this.requests = response;
      console.log(response);
    })
  }
  
  accept(request: FriendRequest) {
    this.friendService.acceptFriendRequest(request).subscribe((u:any)=>{
      Swal.fire({
      title: 'New friend alert!',
      text: `${request.user?.firstName} ${request.user?.lastName} is now your friend`,
      icon: 'success',
      showCancelButton: true
      })
    })

    this.getAllFriendRequest();
  }

  reject(request: FriendRequest): void {
    Swal.fire({
      title: 'Friend request rejected',
      text: `Rejected ${request.user?.firstName} ${request.user?.lastName} friend request`,
      icon: 'warning',
    }).then(a => {
      this.friendService.rejectFriendRequest(request).subscribe(r => {
      })
    })

    this.getAllFriendRequest();
  }
}
