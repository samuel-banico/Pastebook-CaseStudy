import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ){
    let token: string = this.sessionService.getToken();
    if(token)
    {
      this.router.navigate(['page-not-found']);
    }
  }
  
  ngOnInit(): void {
    
  }
}
