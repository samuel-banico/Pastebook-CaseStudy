import { Component, OnInit } from '@angular/core'; //Added OnInit
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';  // Import the Router
import { NotifNavbarModalService } from '@services/notif-navbar-modal.service'; // Import the Service
import { Notification } from '@models/notification'; // Import the Model
import { Album } from '@models/album';
import { DataTransferService } from '@services/data-transfer.service';
import { User } from '@models/user';

@Component({
  selector: 'app-notifnavbarmodal',
  templateUrl: './notifnavbarmodal.component.html',
  styleUrls: ['./notifnavbarmodal.component.css']
})
export class NotifnavbarmodalComponent implements OnInit {
  notifs:Notification[] = [];
  user:User = new User();
  //notif:Notification = new Notification();
    constructor(
      public modalRef: MdbModalRef<NotifnavbarmodalComponent>,
      private router: Router, 
      private notifService:NotifNavbarModalService,
      private dataTransferService:DataTransferService
    ) {}
    close(): void {
      const closeMessage = 'Modal closed';
      this.modalRef.close(closeMessage);
    }

    post(): void {
      //this.router.navigate(['/post']);
    }

    ngOnInit(): void {
      this.getAllNotifications();
      this.getUnseenNotifications();
      this.clearAllNotifications();
    }

    //Get All Notifications
    getAllNotifications(){
      this.notifService.getAllNotif().subscribe((response:any)=>{
        this.notifs = response;
        console.log(response);                                                                                                           
      })
    }

    //Get Unseen Notifications
    getUnseenNotifications(){
      this.notifService.getUnseenNotif().subscribe((response:any)=>{
        this.notifs = response;
      })
    }

    //If clicked then it will update the hasSeen as true.
    goToSinglePage(notif:Notification)
    {
      console.log(notif);
      this.notifService.updateSeenNotification(notif).subscribe((response:Record<string,any>)=>{
        if(notif.postId){
          this.dataTransferService.data=notif.postId;
          this.router.navigate(['/post']);
        }else if(!notif.albumId){
          this.dataTransferService.data=notif.albumId;
          this.router.navigate(['/post']);
        }else{
          this.dataTransferService.data=notif.userId;
          this.router.navigate(['/otherProfile']);
        }
      })
    }

    clearAllNotifications(){
      this.notifService.clearNotif().subscribe((response:any)=>{
        response['result'] === 'notification_seen';
      })
    }
}
