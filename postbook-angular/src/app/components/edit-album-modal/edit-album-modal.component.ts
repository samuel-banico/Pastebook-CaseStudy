import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.css']
})
export class EditAlbumModalComponent {
  editedAlbumName: string = '';
  editedAlbumDescription: string = '';

  constructor(
    public modalRef: MdbModalRef<EditAlbumModalComponent>,
    private http: HttpClient
  ) {}

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
}
