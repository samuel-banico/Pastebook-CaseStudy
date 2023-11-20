import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

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

   
}

