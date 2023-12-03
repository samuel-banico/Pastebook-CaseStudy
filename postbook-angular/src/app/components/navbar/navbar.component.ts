import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { User } from '@models/user';

import { UserService } from '@services/user.service';
import { NavbarcountService } from '@services/navbarcount.service'; // Import the service
import { SessionService } from '@services/session.service';
import { HomeService } from '@services/home.service';

import { NotifnavbarmodalComponent } from '@components/notifnavbarmodal/notifnavbarmodal.component';
import { SearchmodalComponent } from '@components/searchmodal/searchmodal.component';
import { FriendrequestmodalComponent } from '@components/friendrequestmodal/friendrequestmodal.component';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('togglerCheckbox') togglerCheckbox: ElementRef | undefined;

  searchRef: MdbModalRef<SearchmodalComponent> | null = null;
  modalRef: MdbModalRef<NotifnavbarmodalComponent> | MdbModalRef<FriendrequestmodalComponent> | null = null;
  user: User = new User;
  notificationCount: number = 0;
  friendRequestCount: number = 0;

  constructor(
    private router: Router,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private userService: UserService,
    private navbarcountService: NavbarcountService, // Inject the service
    private homeService: HomeService,
    private tokenService: TokenService
  ) {
      this.tokenService.validateToken();

      this.userService.getUserByToken().subscribe((response: any) => {
        this.user = response;
      });

      this.homeService.getNotificationCount().subscribe((notif: any) => {
        this.notificationCount = notif;
        console.log("notification: " + this.notificationCount);
      })

      this.homeService.getFriendRequestCount().subscribe((notif: any) => {
        this.friendRequestCount = notif;
        console.log("friend request:" + this.friendRequestCount);

      })

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
    // Subscribe to notification count
    this.navbarcountService.notificationCount$.subscribe(count => {
      this.notificationCount = count;
    });

    // Subscribe to friend request count
    this.navbarcountService.friendRequestCount$.subscribe(count => {
      this.friendRequestCount = count;
    });
  }

  openNotifModal() {
    this.modalRef = this.modalService.open(NotifnavbarmodalComponent);
  }

  openFriendModal() {
    this.modalRef = this.modalService.open(FriendrequestmodalComponent);
  }
  
  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // delete access token from database
        this.userService.logout().subscribe();

        // delete all tokens
        this.sessionService.clear();

        // returns to login
        this.router.navigate(['/login']);
      }
    });
  }
  
  openSearchModal() {
    this.searchRef = this.modalService.open(SearchmodalComponent)
  }

  toProfile(){
    let uniqueId = (this.user.firstName!+this.user.lastName!+this.user.salt!).replace(/\s/g, '');
    this.router.navigate(['YourProfile/'+uniqueId])
  }
 
}



