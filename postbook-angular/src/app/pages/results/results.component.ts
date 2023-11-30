import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '@services/home.service';
import { DataTransferService } from '@services/data-transfer.service';
import { SessionService } from '@services/session.service';
import { User } from '@models/user';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{

  searchUser: string = "";
  users: User[] = [];
  noMatchingUser: boolean = false;

  constructor(
    public router: Router,
    public homeService: HomeService,
    public sessionService: SessionService,
    public dataTransfer: DataTransferService
  ){
    this.getResults();
  }

  ngOnInit(): void {
  }

  getResults(){
    this.searchUser = this.sessionService.getSearchUser()
    
    if(this.searchUser)
    {
      this.homeService.searchAllUser(this.searchUser).subscribe((response: User[]) => {
        this.users = response;
        console.log(this.users);

        if(response.length === 0) {
          this.noMatchingUser = true;
        } else {
          this.noMatchingUser = false;
        }
      })
    }
    else if (this.searchUser == ""){
      this.noMatchingUser = true;
    }
    else
    {
      this.users = [];
    }
  }

  userClicked(clickedUser: User) {
    this.sessionService.setUser(clickedUser.id!);
    this.router.navigate(["Profile/"+clickedUser.firstName + "_" + clickedUser.lastName]).then(()=>{
      window.location.href = "Profile/"+clickedUser.firstName + "_" + clickedUser.lastName;
    });
  }
}
