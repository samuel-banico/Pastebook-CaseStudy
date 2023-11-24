import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  showPassword: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {
    let token: string = this.sessionService.getToken();
    var useableToken;

    if(token)
    {
      this.userService.validateToken().subscribe((r) => {
        useableToken = r;
      })
      if(!useableToken) {
        this.sessionService.clear();
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    console.log('button pressed');
    this.userService.login(this.email, this.password).subscribe({next: this.successfullLogin.bind(this),
      error: this.failedLogin.bind(this)
    })
  }

  successfullLogin(response: Record<string, any>) {
    this.sessionService.setToken(response['token']);
    console.log(this.sessionService.getToken());
    this.router.navigate(['login']).then(()=>{
      window.location.href = "/"; // full page reload to ensure cache of the localStorage is removed.
    });
  };

  failedLogin(result: Record<string, any>){
    Swal.fire('Login Failed', 'Incorrect Credentials, kindly try again.', 'error');
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
