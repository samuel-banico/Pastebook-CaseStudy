import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { AlbumService } from '@services/album.service';
import { SessionService } from '@services/session.service';

import { Album } from '@models/album';
import Swal from 'sweetalert2';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.css']
})
export class EditAlbumModalComponent{
  album:Album = new Album();

  constructor(
    public modalRef : MdbModalRef<EditAlbumModalComponent>,
    private route : ActivatedRoute,

    private albumService : AlbumService,
    private sessionService: SessionService,
    private tokenService: TokenService
  ) {
    this.tokenService.validateToken();


    albumService.getAlbumById(this.sessionService.getAlbum()).subscribe((response:Object) => {
      this.album = response;
      console.log(this.album);
    })
   }

  closeModal() {
    this.modalRef.close();
  }

  albumNameRemainChars: number = 50;
  showAlbumNameRemainingCharacters(remainChars: number):void {
    this.albumNameRemainChars = remainChars;
  }

  albumDescRemainChars: number = 500;
  showAlbumDescRemainingCharacters(remainChars: number):void {
    this.albumDescRemainChars = remainChars;
  }

  //Edit the Album Image
  updateAlbum(){
    this.albumService.editAlbum(this.album).subscribe((response: Album) => {
     this.album = response;
     Swal.fire('Edit Album', 'Successfully edited your album', 'success');
    })

    this.closeModal();
  }

}
