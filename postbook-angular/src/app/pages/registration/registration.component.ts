import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';
import { User } from '@models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = "";
  showPassword: boolean = false;
  passwordMismatch: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService
  ) {
    let token: string = this.sessionService.getToken();
    if(token) {
      this.router.navigate(['page-not-found']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.user);
    this.userService.register(this.user).subscribe({
      next: this.successfulRegister.bind(this),
      error: this.failedRegister.bind(this)
    });
  }

  successfulRegister(response: Record<string, any>) {
    Swal.fire('Registration Successful', 'You can now login using your new account.', 'success');
    this.router.navigate(['login']);
  }

  failedRegister(result: Record<string, any>){
    Swal.fire('Registration Failed', 'Email already taken, try again using a different email.', 'error');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  confirmPasswordMismatch() {
    return this.passwordMismatch;
  }

  onConfirmPasswordInput() {
    this.passwordMismatch = this.user.password !== this.confirmPassword;
  }

  // Calculate the minimum date for the age validation
  calculateMinDate(): string {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate())
      .toISOString()
      .split('T')[0];
  }
}
