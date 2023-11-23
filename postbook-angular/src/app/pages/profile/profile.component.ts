import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ){
    let token: string = this.sessionService.getToken();
    if(!token)
    {
      this.router.navigate(['page-not-found']);
    }
  }

  ngOnInit(): void {
    
  }
}
