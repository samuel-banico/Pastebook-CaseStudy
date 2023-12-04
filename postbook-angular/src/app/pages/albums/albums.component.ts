import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { CreatealbummodalComponent } from '@components/createalbummodal/createalbummodal.component';

import { SessionService } from '@services/session.service';
import { TokenService } from '@services/token.service';
import { AlbumService } from '@services/album.service';

import { Album } from '@models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  modalRef: MdbModalRef<CreatealbummodalComponent> | null = null;
  albumList: Album[] = [];

  constructor(
      private router: Router,

      private modalService: MdbModalService,
      private sessionService: SessionService,
      private tokenService: TokenService,
      private albumService: AlbumService,
      private sharedService: SharedService
    ) {
      this.tokenService.validateToken();

      this.sessionService.clearPost();
  }

  ngOnInit(): void {
    this.albumService.getAllUserAlbum().subscribe((a: any) => {
      this.albumList = a;
    });
    this.sharedService.dataSaved$.subscribe(() => {
      // Trigger the reload when data is saved
      this.tokenService.validateToken();
    });
  }

  

  openModal() {
    this.modalRef = this.modalService.open(CreatealbummodalComponent)
  }

  toAlbum(albumId: string) {
    this.sessionService.setAlbum(albumId);
    this.router.navigate(['YourAlbum/'+albumId]);
  }
}
