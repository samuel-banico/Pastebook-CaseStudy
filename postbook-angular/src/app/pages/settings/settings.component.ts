import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@models/user';
import { Obj } from '@popperjs/core';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  user: User = new User();
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService
  ){
    let userId: number = Number.parseInt(this.session.getId());
    userService.getUser(userId).subscribe((response: Object)=> 
    {
      this.user = response
      console.log(response);
    })
  }
  
  div1:boolean=true;
   div2:boolean=false;

  showPassword = false;
  // Inside your component class

securityPassword: string = '';
isPasswordCorrect: boolean = false;

onUpdateSecurity() {
  // Log the entered password to see what's being entered
  console.log('Entered Password:', this.securityPassword);

  // Perform password validation logic here (compare with the correct password)
  // For example, you might have a service that validates the password
  const correctPassword = 'correctPassword'; // Replace with your actual correct password

  // Log the correct password to verify
  console.log('Correct Password:', correctPassword);

  this.isPasswordCorrect = this.securityPassword === correctPassword;

  // Log the result of the password validation
  console.log('Is Password Correct:', this.isPasswordCorrect);

  // Clear the entered password for security reasons
  this.securityPassword = '';
}

// ... Other methods and properties in your component class ...


  div1Function(){
      this.div1=true;
      this.div2=false;
  }

  div2Function(){
      this.div2=true;
      this.div1=false;     
  }

  ngOnInit(): void {}
  
  onUpdate(): void {
    this.userService.update(this.user).subscribe((response: Record<string, any>)=>{
      if(response['result'] === 'updated'){
        Swal.fire('Update Successful','Profile updated successfully','success');
        }
      });
  }

  // Inside your component class
editMode: { [key: string]: boolean } = {
  firstName: false,
  lastName: false,
  birthday: false,
  gender: false,
};

enableEdit(field: string) {
  // Use type assertion to tell TypeScript that 'field' is a valid key
  (this.editMode as { [key: string]: boolean })[field] = true;
}

resetChanges() {
  // Reset the fields to their default values
  // You need to implement this based on how default values are stored in your application
  this.user = { firstName: 'defaultFirstName', lastName: 'defaultLastName', /* other fields */ };
  
  // Disable edit mode for all fields
  Object.keys(this.editMode).forEach((key) => {
    (this.editMode as { [key: string]: boolean })[key] = false;
  });
}


}

