import { Component, Input,ElementRef, ViewChild  } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { AlbumService } from '@services/album.service';
import { SessionService } from '@services/session.service';
import { Router } from '@angular/router';

import { Album } from '@models/album';
import { TokenService } from '@services/token.service';


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
      private tokenService: TokenService,
      private router: Router,
      private sessionService: SessionService
    ) {
      this.tokenService.validateToken();
    }

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
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

  saveData() {
    this.albumService.createAlbum(this.album).subscribe((response: any) => {
      console.log(response);
      this.id = response.id;

      for (let i = 0; i < this.pictureFileList.length; i++) {
        const image = this.pictureFileList[i];
        console.log(i);

        if(i == 0) {
          this.albumService.assignCoverImageToAlbum(response.id, image).subscribe();
        }
        
        this.albumService.createAlbumImage(response.id, image).subscribe();
        console.log(image);
      }

      Swal.fire({
        title: `Album Created`,
        text: `(${this.album.albumName}) has been added successfully`,
        icon: 'success'
      })

      this.closeModal();
    })
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
        console.log('Picture List');
        console.log(this.pictureList);

        this.pictureFileList.push(file);
        console.log('Picture File List');
        console.log(this.pictureFileList);

      }
    }
  }

 
}
