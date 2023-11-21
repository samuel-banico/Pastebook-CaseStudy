import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-notifnavbarmodal',
  templateUrl: './notifnavbarmodal.component.html',
  styleUrls: ['./notifnavbarmodal.component.css']
})
export class NotifnavbarmodalComponent {
    constructor(public modalRef: MdbModalRef<NotifnavbarmodalComponent>) {}
  
    close(): void {
      const closeMessage = 'Modal closed';
      this.modalRef.close(closeMessage)
    }

}
