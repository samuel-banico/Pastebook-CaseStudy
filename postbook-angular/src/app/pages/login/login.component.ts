import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';
import { EncryptService } from '@services/encrypt.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private encryptService: EncryptService,
    private tokenService: TokenService,

    private router: Router
  ) {
    if(this.sessionService.getToken()) {
      this.tokenService.validateToken();
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    if(this.sessionService.getLoginCredentials()) {
      const encryptedUserCredentials = this.sessionService.getLoginCredentials();
      const userCredentials = this.encryptService.decrypt(encryptedUserCredentials);

      this.email = userCredentials.email;
      this.password = userCredentials.password;
      this.rememberMe = true;
    }
    else {
      this.email = '';
      this.password = '';
      this.rememberMe = false;
    }
  }

  onSubmit() {
    // login the user
    this.userService.login(this.email, this.password).subscribe({next: this.successfullLogin.bind(this),
      error: this.failedLogin.bind(this)
    }) 
  }

  successfullLogin(response: Record<string, any>) {
    if(this.rememberMe) {
      const userCredentials = {email: this.email, password: this.password};
      this.sessionService.setLoginCredentials(this.encryptService.encrypt(userCredentials));
    }
    else {
      if(this.sessionService.getLoginCredentials()) {
        this.sessionService.clearRememberMe();
      }
    }
    
    this.sessionService.setToken(response['token']);

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
