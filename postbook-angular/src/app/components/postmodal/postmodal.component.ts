import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.css']
})
export class PostmodalComponent {
  constructor(public modalRef: MdbModalRef<PostmodalComponent>) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  selectedOption = 'Public';
  onOptionSelect(option: string) {
    this.selectedOption = option;
  }
}
