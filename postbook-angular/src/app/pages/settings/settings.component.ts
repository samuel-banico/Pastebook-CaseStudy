import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@models/user';
import { Obj } from '@popperjs/core';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

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
    private route: ActivatedRoute
  ){
    let userId: number = this.route.snapshot.params['id'];
    userService.getUser(userId).subscribe((response: Object)=>{this.user = response})
  }
  
  div1:boolean=true;
   div2:boolean=false;

  showPassword = false;
    

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
}

