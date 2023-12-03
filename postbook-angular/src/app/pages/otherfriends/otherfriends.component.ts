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
  this.friendService.getAllFriends(this.sessionService.getUser(), 'id').subscribe((response: Friend[])=>{
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
