import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-createalbummodal',
  templateUrl: './createalbummodal.component.html',
  styleUrls: ['./createalbummodal.component.css']
})
export class CreatealbummodalComponent {
  constructor(public modalRef: MdbModalRef<CreatealbummodalComponent>) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
}
