import { Component, Input,ElementRef, ViewChild  } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { AlbumService } from '@services/album.service';
import { SessionService } from '@services/session.service';

import { Album } from '@models/album';


@Component({
  selector: 'app-createalbummodal',
  templateUrl: './createalbummodal.component.html',
  styleUrls: ['./createalbummodal.component.css']
})
export class CreatealbummodalComponent {
  @Input() input1: string = '';
  @Input() input2: string = '';
  pictureList: string[] = [];
  pictureFileList: File[] = [];
  album: Album = new Album();
  id: number = 0;

  constructor(
      public modalRef: MdbModalRef<CreatealbummodalComponent>,
      private albumService: AlbumService,
      private sessionService: SessionService
    ) {}

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    this.album.userId = this.sessionService.getId();

    this.albumService.createAlbum(this.album).subscribe((response: any) => {
      console.log(response);
      this.id = response.id;
      console.log(this.id);

      this.pictureFileList.forEach(image => {
      this.albumService.createAlbumImage(image, this.id).subscribe((r) => {
        console.log("Image save")
      })});

        /*Swal.fire({
          title: `Album Created`,
          text: `(${this.album.albumName}) has been added successfully`,
          icon: 'success'
        })*/
    })
    console.log('Data saved:', this.input1, this.input2);
    console.log(this.pictureFileList);
    this.closeModal();
  }

  onFileSelected(event: any) {
    // Handle file selection logic
    const selectedFiles = event.target.files;
    this.processFiles(selectedFiles);
  }

  onFileDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer.files;
    this.processFiles(droppedFiles);
  }

  private processFiles(files: FileList | null) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Perform any additional processing or validation if needed
        // For now, just add the file path to the pictureList
        this.pictureList.push(URL.createObjectURL(file));
        console.log(this.pictureList)

        this.pictureFileList.push(file);
      }
    }
  }

 
}
