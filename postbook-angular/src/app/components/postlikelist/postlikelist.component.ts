import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-postlikelist',
  templateUrl: './postlikelist.component.html',
  styleUrls: ['./postlikelist.component.css']
})
export class PostlikelistComponent {
  constructor(public modalRef: MdbModalRef<PostlikelistComponent>) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }
}
