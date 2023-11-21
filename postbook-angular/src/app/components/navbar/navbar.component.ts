import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home.service';
import { User } from '@models/user';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NotifnavbarmodalComponent } from '@components/notifnavbarmodal/notifnavbarmodal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchUser: string = "";
  user: User[] = []

  modalRef: MdbModalRef<NotifnavbarmodalComponent> | null = null;

  constructor(
    private homeService: HomeService,
    private modalService: MdbModalService
    
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

  openModal() {
    this.modalRef = this.modalService.open(NotifnavbarmodalComponent)

 
}

}
