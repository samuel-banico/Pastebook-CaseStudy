import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from '@models/user';

import { UserService } from '@services/user.service';
import { FriendService } from '@services/friend.service';
import { DataTransferService } from '@services/data-transfer.service';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.css']
})
export class OtherprofileComponent implements OnInit {
  user: User = new User();
  userId: string = "";

  constructor(
    private dataTransferService: DataTransferService,
    private userService: UserService,
    private tokenService: TokenService,
    private friendService: FriendService,

    private router: Router
  ) {
    this.tokenService.validateToken();
    
    this.userId = this.dataTransferService.data;
    if(!this.userId) {
      Swal.fire('Internal Server Error', 'Something happened lets go back', 'info').then( a => {
        this.router.navigate(['']);
      })
    }
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((u : any) => {
      this.user = u;
    })
  }

  addFriend(): void {
    console.log(this.user);
    this.friendService.sendFriendRequest(this.user).subscribe( (u : any) => {
      Swal.fire('Friend Request sent', `You have sent a friend request to ${this.user.firstName} ${this.user.lastName}`, 'success');
    }/* , error => {
      console.log(error);
      Swal.fire('Internal Server Error', 'Something happened lets go back', 'info').then( a => {
        this.router.navigate(['']);
      })
    } */);
  }
}
