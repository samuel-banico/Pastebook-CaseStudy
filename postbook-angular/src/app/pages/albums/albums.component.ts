import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

import { CreatealbummodalComponent } from '@components/createalbummodal/createalbummodal.component';

import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  modalRef: MdbModalRef<CreatealbummodalComponent> | null = null;

  constructor(
      private router: Router,
      private modalService: MdbModalService,
      private sessionService: SessionService,
    ) {
      let token: string = this.sessionService.getToken();
      if(!token) {
        this.router.navigate(['page-not-found']);
      }
  }

  openModal() {
    this.modalRef = this.modalService.open(CreatealbummodalComponent)
  }
}
