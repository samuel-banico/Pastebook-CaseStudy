import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { HomeService } from '@services/home.service';
import { UserService } from '@services/user.service';

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
      private homeService: HomeService,
    ) {}

  onType(event : any) {
    if(this.searchUser)
    {
      this.homeService.search(this.searchUser).subscribe((response: User[]) => {
        this.user = response;
        console.log(response);
      })
    }
    else
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

  // Assuming you have a function to handle user click events in your component class
userClicked(clickedUser: any) {
  // Do something with the clicked user, for example, log the user's information
  console.log('User clicked:', clickedUser);
}

// Assuming you have a function to show all results
showAllResults() {
  // Implement the logic to show all results
  console.log('Show all results');
}

}
