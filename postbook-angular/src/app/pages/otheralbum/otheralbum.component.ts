import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

import { CreatealbummodalComponent } from '@components/createalbummodal/createalbummodal.component';

import { SessionService } from '@services/session.service';
import { TokenService } from '@services/token.service';
import { AlbumService } from '@services/album.service';
import { DataTransferService } from '@services/data-transfer.service';

import { Album } from '@models/album';

@Component({
  selector: 'app-otheralbum',
  templateUrl: './otheralbum.component.html',
  styleUrls: ['./otheralbum.component.css']
})
export class OtheralbumComponent {
  modalRef: MdbModalRef<CreatealbummodalComponent> | null = null;
  albumList: Album[] = [];
  user: string = "";

  constructor(
      private router: Router,

      private modalService: MdbModalService,
      private sessionService: SessionService,
      private tokenService: TokenService,
      private albumService: AlbumService,
      private dataTransferService: DataTransferService
    ) {
      this.tokenService.validateToken();
  }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.albumService.getAllFriendAlbum(this.user).subscribe((a: any) => {
      this.albumList = a;
      console.log(this.albumList);
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(CreatealbummodalComponent)
  }

  toAlbum(albumId: string) {
    this.dataTransferService.data = albumId;
    this.router.navigate(['create']);
    console.log(albumId);
  }
}
