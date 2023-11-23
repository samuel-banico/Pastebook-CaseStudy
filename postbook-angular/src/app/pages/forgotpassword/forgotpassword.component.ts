import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: string = '';
  showPassword = false;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ){
    let token: string = this.sessionService.getToken();
    if(token) {
      this.router.navigate(['page-not-found']);
    }
  }

  ngOnInit(): void {
    
  }

  submitForm() {
    // Add logic to handle the form submission (e.g., send a reset email)
    console.log('Email submitted:', this.email);
    // You may want to implement a service to handle the password reset process
  }

  isValidEmail(): boolean {
    // Add your email validation logic here
    // For example, checking if the email contains '@'
    return !!(this.email && this.email.includes('@'));
  }
  
}
