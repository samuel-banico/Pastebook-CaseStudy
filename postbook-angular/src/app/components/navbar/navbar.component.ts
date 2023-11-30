import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NotifnavbarmodalComponent } from '@components/notifnavbarmodal/notifnavbarmodal.component';
import { SearchmodalComponent } from '@components/searchmodal/searchmodal.component';
import { FriendrequestmodalComponent } from '@components/friendrequestmodal/friendrequestmodal.component';
import Swal from 'sweetalert2';
import { SessionService } from '@services/session.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserService } from '@services/user.service';
import { NavbarcountService } from '@services/navbarcount.service'; // Import the service
import { User } from '@models/user';

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
    private navbarcountService: NavbarcountService // Inject the service
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reset the checkbox state when the route changes
        if (this.togglerCheckbox) {
          this.togglerCheckbox.nativeElement.checked = false;
        }
      }
    });

    let token: string = this.sessionService.getToken();
    if (!token) {
      this.router.navigate(['page-not-found']);
    } else {
      this.userService.getUserByToken().subscribe((response: any) => {
        this.user = response;
        
      });
    }
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
    this.router.navigate(['profile/'+this.user.firstName+'_'+this.user.lastName])
  }
 
}



