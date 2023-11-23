import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NotifnavbarmodalComponent } from '@components/notifnavbarmodal/notifnavbarmodal.component';
import { SearchmodalComponent } from '@components/searchmodal/searchmodal.component';
import { FriendrequestmodalComponent } from '@components/friendrequestmodal/friendrequestmodal.component';

import { SessionService } from '@services/session.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('togglerCheckbox') togglerCheckbox: ElementRef | undefined;

  searchRef: MdbModalRef<SearchmodalComponent> | null = null;
  modalRef: MdbModalRef<NotifnavbarmodalComponent> | MdbModalRef<FriendrequestmodalComponent> | null = null;

  constructor(
    private router: Router,
    private modalService: MdbModalService,
    private sessionService: SessionService,
    private userService: UserService
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

  openNotifModal() {

    this.modalRef = this.modalService.open(NotifnavbarmodalComponent)
  }

  openFriendModal() {
    this.modalRef = this.modalService.open(FriendrequestmodalComponent)
  }
  
  logout(): void {
    let id: string = this.sessionService.getId();
    this.userService.logout(id).subscribe((r) => {
      console.log("Image save")
    });

    this.sessionService.clear();
  }

  openSearchModal() {
    this.searchRef = this.modalService.open(SearchmodalComponent)
  }

 
}



