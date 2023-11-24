import { Component, OnInit } from '@angular/core';
import { FriendRequest } from '@models/friend';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

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
}
