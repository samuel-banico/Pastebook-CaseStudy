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
  notif:Notification = new Notification();
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
      //this.getAllNotifications();
      this.getUnseenNotifications();
      this.goToSinglePage();
    }

    //Get All Notifications
    // getAllNotifications(){
    //   this.notifService.getAllNotif().subscribe((response:any)=>{
    //     this.notifs = response;
    //     console.log(response);
    //   })
    // }

    //Get Unseen Notifications
    getUnseenNotifications(){
      this.notifService.getUnseenNotif().subscribe((response:any)=>{
        this.notifs = response;
      })
    }

    //If clicked then it will update the hasSeen as true.
    goToSinglePage()
    {
      this.notifService.updateSeenNotification(this.notif).subscribe((response:Record<string,any>)=>{
        response['result'] === 'notification_seen';
      })  
      this.router.navigate(['/post']);
    }
}
