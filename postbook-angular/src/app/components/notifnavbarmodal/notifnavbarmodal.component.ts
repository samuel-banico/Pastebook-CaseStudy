import { Component, OnInit } from '@angular/core'; //Added OnInit
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';  // Import the Router
import { NotifNavbarModalService } from '@services/notif-navbar-modal.service'; // Import the Service
import { Notification } from '@models/notification'; // Import the Model
import { User } from '@models/user';
import { AllNotifsService } from '@services/all-notifs.service';
import { UserService } from '@services/user.service';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-notifnavbarmodal',
  templateUrl: './notifnavbarmodal.component.html',
  styleUrls: ['./notifnavbarmodal.component.css']
})
export class NotifnavbarmodalComponent implements OnInit {
  notifs:Notification[] = [];
  user:User = new User();

    constructor(
      public modalRef: MdbModalRef<NotifnavbarmodalComponent>,
      private router: Router, 
      private notifService:NotifNavbarModalService,
      private userService: UserService,
      private sessionService: SessionService
    ) {
    }
    close(): void {
      const closeMessage = 'Modal closed';
      this.modalRef.close(closeMessage);
    }

    post(): void {
      //this.router.navigate(['/post']);
    }

    ngOnInit(): void {
      this.getUnseenNotifications();
    }

    clickedGetAllNotifications():void{
      this.router.navigate(['/AllNotifications']);
    }

    //Get Unseen Notifications
    getUnseenNotifications(){
      this.notifService.getUnseenNotif().subscribe((response:any)=>{
        this.notifs = response;
        console.log(response);
      })
      
    }

    //If clicked then it will update the hasSeen as true.
    goToSinglePage(notif:Notification)
    {
      console.log(notif);
      this.notifService.updateSeenNotification(notif).subscribe((response:Record<string,any>)=>{
        if(notif.postId){
          this.sessionService.setPost(notif.postId!);
          this.router.navigate(['post/'+notif.postId]).then(()=>{
            window.location.href = "post/"+notif.postId; 
          });;
        }else if(notif.albumId){
          this.sessionService.setAlbum(notif.albumId!);
          this.router.navigate(['/wrongsend']);
        }else{
          this.sessionService.setUser(notif.userRequestId!);
          console.log(notif.userRequestId);
          this.userService.getUserById(notif.userRequestId!).subscribe((u:any)=>{
            this.user = u;
            console.log(this.user);
            this.router.navigate(["Profile/"+this.user.firstName + "_" + this.user.lastName]);
          });
        }
      })
    }

    clearAllNotifications(){
      this.notifService.clearNotif().subscribe((response:any)=>{
        response['result'] === 'notification_seen';
      })
    }
}
