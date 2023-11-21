import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User = new User();
  profilePicture: string | null = null;

  constructor(
    private userService : UserService,
    private sessionService : SessionService
  ){
    let userId: number = Number.parseInt(this.sessionService.getId());
    this.userService.getUser(userId).subscribe((response : any) => {
      this.user = response;

      const pictureBytes = response.profilePicture;
      if(pictureBytes)
        this.profilePicture = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(pictureBytes)));
    });
  }

  ngOnInit(): void {}

  getUser(){
    
  }

}
