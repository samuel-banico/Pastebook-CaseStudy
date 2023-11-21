import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-friendrequestmodal',
  templateUrl: './friendrequestmodal.component.html',
  styleUrls: ['./friendrequestmodal.component.css']
})
export class FriendrequestmodalComponent {
  constructor(public modalRef: MdbModalRef<FriendrequestmodalComponent>) {}
  
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

}
