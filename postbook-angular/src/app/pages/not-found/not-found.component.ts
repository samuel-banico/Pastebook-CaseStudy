import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ){ }

  ngOnInit(): void {
    
  }

  goBack(): void {
    let token: string = this.sessionService.getToken();
    if(!token)
    {
      this.router.navigate(['landing']);
    } else {
      this.router.navigate(['']);
    }
  }

}
