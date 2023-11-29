import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';
import { AlbumService } from '@services/album.service';
import { Album } from '@models/album';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.css']
})
export class EditAlbumModalComponent{
  editedAlbumName: string = '';
  editedAlbumDescription: string = '';

  albumId:string = '';
  albumDefault:Album = new Album();
  album:Album = new Album();
  constructor(
    public modalRef: MdbModalRef<EditAlbumModalComponent>,
    private http: HttpClient,
    private route: ActivatedRoute,
    private albumService:AlbumService
  ) {
    //This will get which album through id
    // albumService.getAlbumById(this.albumId).subscribe((response:Object) => {
    //   this.album = response;
    // })
   }

  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    // const albumId; 
    // const apiUrl = `your_api_base_url/UpdateAlbum/${albumId}`;

    // const updatedAlbum = {
    //   AlbumName: this.editedAlbumName,
    //   AlbumDescription: this.editedAlbumDescription
    // };

    // this.http.put(apiUrl, updatedAlbum)
    //   .subscribe((response: any) => {
    //     console.log('Album updated successfully:', response);
    //     this.closeModal();
    //   }, error => {
    //     console.error('Error updating album:', error);
    //   });
      this.closeModal();
  }

  //Edit the Album Image
  updateAlbum(){
    this.albumService.editAlbum(this.album).subscribe((response: Album) => {
     this.album = response;
     console.log(response);
    })
  }

}
