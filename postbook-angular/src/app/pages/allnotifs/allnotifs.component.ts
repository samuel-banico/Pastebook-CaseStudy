import { Component, OnInit } from '@angular/core';
import { Notification } from '@models/notification'; // Import the Model
import { Router } from '@angular/router';

import { AllNotifsService } from '@services/all-notifs.service';
import { NotifNavbarModalService } from '@services/notif-navbar-modal.service';
import { SessionService } from '@services/session.service';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-allnotifs',
  templateUrl: './allnotifs.component.html',
  styleUrls: ['./allnotifs.component.css']
})
export class AllnotifsComponent implements OnInit {

  notifs:Notification[] = [];

  constructor(
    private router: Router,

    private allNotifService:AllNotifsService,
    private notifService: NotifNavbarModalService,
    private sessionService: SessionService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {
    this.tokenService.validateToken();

    this.allNotifService.getAllNotif().subscribe((response:any)=>{
      this.notifs = response;
      console.log(this.notifs)
    })

  }

  goToSinglePage(notif:Notification)
    {
      console.log(notif);
      this.notifService.updateSeenNotification(notif.id!).subscribe((response:Record<string,any>)=>{
        if(notif.postId){
          this.sessionService.setPost(notif.postId!);
          this.router.navigate(['post/'+notif.postId]).then(()=>{
            window.location.href = "post/"+notif.postId; 
          });;
        }else if(notif.albumId){
          this.sessionService.setAlbum(notif.albumId!);
          this.router.navigate(['Album/'+notif.albumId]);
        }else{
          this.sessionService.setUser(notif.userRequestId!);
          console.log(notif.userRequestId);

          this.userService.getUserById(notif.userRequestId!).subscribe((user:any)=>{
            let uniqueId = (user.firstName!+user.lastName!+user.salt!).replace(/\s/g, '');
            this.router.navigate(["Profile/"+uniqueId]);
          });
        }
      })

    }

  ngOnInit(): void {}
}

