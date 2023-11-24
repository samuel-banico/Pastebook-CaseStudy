import { Component, OnInit } from '@angular/core'; //Added OnInit
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';  // Import the Router
import { NotifNavbarModalService } from '@services/notif-navbar-modal.service'; // Import the Service
import { Notification } from '@models/notification'; // Import the Model

@Component({
  selector: 'app-notifnavbarmodal',
  templateUrl: './notifnavbarmodal.component.html',
  styleUrls: ['./notifnavbarmodal.component.css']
})
export class NotifnavbarmodalComponent implements OnInit {
  notifs:Notification[] = [];
    constructor(
      public modalRef: MdbModalRef<NotifnavbarmodalComponent>,
      private router: Router, 
      private notifService:NotifNavbarModalService
    ) {}
  
    close(): void {
      const closeMessage = 'Modal closed';
      this.modalRef.close(closeMessage);
    }

    post(): void {
      this.router.navigate(['/post']);
    }

    ngOnInit(): void {
      this.getAllNotifications();
    }

    //Get All Notifications
    getAllNotifications(){
      this.notifService.getAllNotif().subscribe((response:any)=>{
        this.notifs = response;
        console.log(response);
      })
    }
}
