import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { FriendService } from '@services/friend.service';
import { Friend } from '@models/friend';

@Component({
  selector: 'app-otherfriends',
  templateUrl: './otherfriends.component.html',
  styleUrls: ['./otherfriends.component.css']
})
export class OtherfriendsComponent {
  friends: Friend[] = [];

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
  this.friendService.getAllFriends().subscribe((response: Friend[])=>{
    this.friends = response;
    console.log(response);
  });
 }
}
