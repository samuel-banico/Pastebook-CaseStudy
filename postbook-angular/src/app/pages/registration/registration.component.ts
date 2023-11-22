import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '@services/user.service';
import { User } from '@models/user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = "";
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

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
}
