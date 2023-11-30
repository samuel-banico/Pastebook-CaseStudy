import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

import { HomeService } from '@services/home.service';
import { UserService } from '@services/user.service';
import { DataTransferService } from '@services/data-transfer.service';
import { SessionService } from '@services/session.service';

import { User } from '@models/user';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.component.html',
  styleUrls: ['./searchmodal.component.css']
})
export class SearchmodalComponent implements OnInit {
  searchUser: string = "";
  user: User[] = [];

  constructor(
      public searchRef: MdbModalRef<SearchmodalComponent>,
      private router: Router,
      private homeService: HomeService,
      private sessionService: SessionService,
      private dataTransferService: DataTransferService
    ) {}

  
  noMatchingUser: boolean = false;
  onType(event : any) {
    if(this.searchUser)
    {
      this.homeService.search(this.searchUser).subscribe((response: User[]) => {
        this.user = response;

        if(response.length === 0) {
          this.noMatchingUser = true;
        } else {
          this.noMatchingUser = false;
        }
      })
    }
    else (!this.searchUser)
    {
      this.user = [];
    }
  }

  ngOnInit(): void {
    
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.searchRef.close(closeMessage)
  }

  userClicked(clickedUser: User) {
    this.sessionService.clearUser();
    this.sessionService.setUser(clickedUser.id!);
    this.close();
    this.router.navigate(["Profile/"+clickedUser.firstName + "_" + clickedUser.lastName]);
  }

  showAllResults() {
    this.sessionService.setSearchUser(this.searchUser);
    this.close();
    this.router.navigate(['/results']).then(()=>{
      window.location.href = "/results";
    });
  }

}
