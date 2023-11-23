import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models/user';

import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  profilePicture: string | null = null;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {
    let token: string = this.sessionService.getToken();
    if(!token)
    {
      this.router.navigate(['page-not-found']);
    }
    else {
      this.userService.getUserByToken().subscribe((response: any) => {
        this.user = response;
        console.log(response);
      });
    }
  }

  ngOnInit(): void {}

  showOverlay() {
    const overlay = document.querySelector('.overlay') as HTMLElement | null;
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  hideOverlay() {
    const overlay = document.querySelector('.overlay') as HTMLElement | null;
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  changeImage() {
    // Your existing code for changing the image
  }
}
