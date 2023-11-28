import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { AlbumService } from '@services/album.service';
import { SessionService } from '@services/session.service';
import { TokenService } from '@services/token.service';
import { DataTransferService } from '@services/data-transfer.service';

import { Album } from '@models/album';

@Component({
  selector: 'app-addphotomodal',
  templateUrl: './addphotomodal.component.html',
  styleUrls: ['./addphotomodal.component.css']
})
export class AddphotomodalComponent implements OnInit {
  pictureList: string[] = [];
  pictureFileList: File[] = [];

  album: Album = new Album();
  id: string = "";

  constructor(
    private modalRef: MdbModalRef<AddphotomodalComponent>,
    private albumService: AlbumService,
    private tokenService: TokenService,
    private dataTransferService: DataTransferService
  ) {
    this.tokenService.validateToken();

    this.id = this.dataTransferService.data;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.albumService.getAlbumById(this.id).subscribe((a : any) => {
      this.album = a;
      console.log(this.album);
    });
  }

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    this.pictureFileList.forEach(element => {
      this.albumService.createAlbumImage(this.id, element).subscribe((a:any) => {
        console.log(a);
      });
    });
    
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
        this.pictureFileList.push(file);
      }
    }
  }
}
