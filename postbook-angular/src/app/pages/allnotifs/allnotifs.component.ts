import { Component, OnInit } from '@angular/core';
import { AllNotifsService } from '@services/all-notifs.service';
import { Notification } from '@models/notification'; // Import the Model

@Component({
  selector: 'app-allnotifs',
  templateUrl: './allnotifs.component.html',
  styleUrls: ['./allnotifs.component.css']
})
export class AllnotifsComponent implements OnInit {

  notifs:Notification[] = [];

  constructor(
    private allNotifService:AllNotifsService
  ) {
    this.allNotifService.getAllNotif().subscribe((response:any)=>{
      this.notifs = response;
      console.log(this.notifs)
    })

  }

  ngOnInit(): void {}
}

