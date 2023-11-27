import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

import { HomeService } from '@services/home.service';
import { UserService } from '@services/user.service';
import { DataTransferService } from '@services/data-transfer.service';

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
    this.close();
    this.dataTransferService.data = clickedUser.id;
    this.router.navigate(['otherProfile']);
  }

  showAllResults() {
    console.log('Show all results');
    this.router.navigate(['results']);
  }

}
