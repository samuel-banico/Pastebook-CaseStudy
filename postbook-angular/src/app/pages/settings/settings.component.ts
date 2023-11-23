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
  userDefault: User = new User();
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ){
    let token: string = this.sessionService.getToken();
    if(!token)
    {
      this.router.navigate(['page-not-found']);
    }
    else {
      let userId: string = this.sessionService.getId();
    userService.getUser(userId).subscribe((response: User)=> 
    {
      this.user = {...response};
      this.userDefault = {...response};
    })
    }
    
  }
  
  div1:boolean=true;
   div2:boolean=false;

  showPassword = false;
  // Inside your component class

securityPassword: string = '';
isPasswordCorrect: boolean = false;

passwordVerify(event: any) {
  this.userService.editUserSecurityVerifyPassword(this.securityPassword).subscribe((response: Record<string, any>)=>{
    this.isPasswordCorrect = true
    }, (error) => {
      Swal.fire('Unauthorized','Incorrect Password', 'error');
    });

  this.securityPassword = '';
}

newPassword: string = '';
confirmNewPassword: string = '';

onUpdateSecurity() {
  this.user.password = this.newPassword;
  console.log(this.user);
  this.userService.updateSecurity(this.user).subscribe((response: Record<string, any>)=>{
    if(response['result'] === 'user_details_updated.'){
      Swal.fire('Update Successful','Profile updated successfully','success');
      }
    });
}


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
    console.log(this.user);
    this.userService.updateGeneral(this.user).subscribe((response: Record<string, any>)=>{
      if(response['result'] === 'user_details_updated.'){
        Swal.fire('Update Successful','Profile updated successfully','success');
        this.user = {...response};
        this.userDefault = {...response};
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
  this.user = {...this.userDefault};
  
  // Disable edit mode for all fields
  Object.keys(this.editMode).forEach((key) => {
    (this.editMode as { [key: string]: boolean })[key] = false;
  });
}


}

