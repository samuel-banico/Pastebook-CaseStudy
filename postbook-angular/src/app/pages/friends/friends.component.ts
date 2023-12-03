import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { FriendService } from '@services/friend.service';
import { Friend } from '@models/friend';
import { User } from '@models/user';
import { TokenService } from '@services/token.service';
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
    private router: Router,
    private tokenService: TokenService
  ) {
    this.tokenService.validateToken();

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

 userClicked(clickedUser: User) {
    this.sessionService.clearUser();
    this.sessionService.setUser(clickedUser.id!);
    
    let uniqueId = (clickedUser.firstName!+clickedUser.lastName!+clickedUser.salt!).replace(/\s/g, '');
    this.router.navigate(["Profile/" + uniqueId]).then(()=>{
      window.location.href = "Profile/" + uniqueId;
    });
  }
}
