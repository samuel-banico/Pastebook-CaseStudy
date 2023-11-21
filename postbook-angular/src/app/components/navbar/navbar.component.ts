import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '@services/home.service';
import { User } from '@models/user';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('togglerCheckbox') togglerCheckbox: ElementRef | undefined;


  searchUser: string = "";
  user: User[] = []

  constructor(
    private homeService: HomeService,
    private router: Router
    
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reset the checkbox state when the route changes
        if (this.togglerCheckbox) {
          this.togglerCheckbox.nativeElement.checked = false;
        }
      }
    });
    }



  ngOnInit(): void {
    
  }

  onType(event: any) {
    console.log(this.searchUser);
    this.homeService.search(this.searchUser).subscribe((response: User[]) => {
      this.user = response
    })

    console.log(this.user);
  }

  
}
