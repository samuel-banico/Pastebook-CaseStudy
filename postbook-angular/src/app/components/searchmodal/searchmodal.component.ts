import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.component.html',
  styleUrls: ['./searchmodal.component.css']
})
export class SearchmodalComponent {
  constructor(public searchRef: MdbModalRef<SearchmodalComponent>) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.searchRef.close(closeMessage)
  }

  selectedOption = 'Public';
  onOptionSelect(option: string) {
    this.selectedOption = option;
  }
}
