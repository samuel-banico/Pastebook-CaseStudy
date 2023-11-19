import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
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
    this.router.navigate(['']).then(() => {
      //Full page reload to ensure cache of the localStorage is removed.
      window.location.href = "/home";
    });
  };

  failedLogin(result: Record<string, any>){
    Swal.fire('Login Failed', 'Incorrect Credentials, kindly try again.', 'error');
  }
}
