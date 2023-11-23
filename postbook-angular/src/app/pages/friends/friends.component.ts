import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
 constructor(
  private sessionService: SessionService,
  private router: Router
 ){
  let token: string = this.sessionService.getToken();
      if(!token) {
        this.router.navigate(['page-not-found']);
      }
 }
}
