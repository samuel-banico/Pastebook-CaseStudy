import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from './user.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string = '';

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {
    this.token = this.sessionService.getToken();
  }

  validateToken(): void {
      if(!this.token) {
        this.router.navigate(['page-not-found']);
      } else {
        this.userService.validateToken().subscribe( (r : any) => {
          if(!r) {
            Swal.fire("Token Expired", "Your access token has expired, you need to login again", "info").then( r => {
              this.sessionService.clear();
              this.router.navigate(['login']);
            });
          }
        }, (err : Record<string, any>) => {
          console.log(err);
          if(err['status'] === 0 && err['statusText'] === 'Unknown Error') {
            Swal.fire('Reminder', 'Start the back-end database, Thank you', 'error');
          } else if (err['error']['result'] === 'no_user') {
            Swal.fire('Internal Server Error', 'There was an issue in the server. Returning to Login', 'warning');
              this.sessionService.clear();
              this.router.navigate(['login']);
            }
        })
      }
  }
}
