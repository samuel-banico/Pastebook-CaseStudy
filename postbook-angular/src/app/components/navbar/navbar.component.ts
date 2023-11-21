import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home.service';
import { SessionService } from '@services/session.service';
import { User } from '@models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchUser: string = "";
  user: User[] = []

  constructor(
    private homeService: HomeService,
    private sessionService: SessionService
    
  ) {}

  ngOnInit(): void {
    
  }

  onType(event: any) {
    console.log(this.searchUser);
    this.homeService.search(this.searchUser).subscribe((response: User[]) => {
      this.user = response
    })

    console.log(this.user);
  }

  logout(): void {
    this.sessionService.clear();
  }
 
}


