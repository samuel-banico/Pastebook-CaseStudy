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
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit() {
    console.log('button pressed');
    this.userService.login(this.email, this.password).subscribe({next: this.successfullLogin.bind(this),
      error: this.failedLogin.bind(this)
    })
  }

  successfullLogin(response: Record<string, any>) {
    this.sessionService.setEmail(response['email']);
    this.sessionService.setId(response['id']);
    this.sessionService.setToken(response['token']);
    this.router.navigate(['']).then(() => {
      window.location.href = "/";
    });
  };

  failedLogin(result: Record<string, any>){
    Swal.fire('Login Failed', 'Incorrect Credentials, kindly try again.', 'error');
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
