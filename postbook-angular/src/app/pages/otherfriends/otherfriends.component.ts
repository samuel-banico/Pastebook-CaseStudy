import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { FriendService } from '@services/friend.service';
import { TokenService } from '@services/token.service';
import { Friend } from '@models/friend';
import { User } from '@models/user';

@Component({
  selector: 'app-otherfriends',
  templateUrl: './otherfriends.component.html',
  styleUrls: ['./otherfriends.component.css']
})
export class OtherfriendsComponent {
  friends: User[] = [];

  constructor(
    private sessionService: SessionService,
    private friendService: FriendService,
    private tokenService: TokenService,
    private router: Router
  ) {
      this.tokenService.validateToken();
    }

 ngOnInit(): void {
  this.getFriendList();
 }

 getFriendList(){
  this.friendService.getAllFriends(this.sessionService.getUser()).subscribe((response: Friend[])=>{
    this.friends = response;
    console.log(response);
  });
 }
}
