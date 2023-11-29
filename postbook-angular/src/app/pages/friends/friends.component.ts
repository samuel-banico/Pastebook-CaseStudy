import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { FriendService } from '@services/friend.service';
import { Friend } from '@models/friend';
import { User } from '@models/user';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  friends: User[] = [];

  constructor(
    private sessionService: SessionService,
    private friendService: FriendService,
    private router: Router
  ) {
      let token: string = this.sessionService.getToken();
      if(!token) {
        this.router.navigate(['page-not-found']);
      }
    }

 ngOnInit(): void {
  this.getFriendList();
 }

 getFriendList(){
  this.friendService.getAllFriends(this.sessionService.getToken(), 'token').subscribe((response: Friend[])=>{
    this.friends = response;
    console.log(response);
  });
 }
}
