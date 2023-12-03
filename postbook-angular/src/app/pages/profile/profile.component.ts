import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private tokenService:TokenService
  ){
    this.tokenService.validateToken();
    
  }

  ngOnInit(): void {
    
  }
}
