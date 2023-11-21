import { Component } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  email: string = '';
  showPassword = false;

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
