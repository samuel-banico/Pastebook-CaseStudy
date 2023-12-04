import { Component, ElementRef, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-editprofilepicmodal',
  templateUrl: './editprofilepicmodal.component.html',
  styleUrls: ['./editprofilepicmodal.component.css']
})
export class EditprofilepicmodalComponent {
  pictureList: string[] = [];
  pictureFileList: File[] = [];
  id: number = 0;

  constructor(
    public modalRef: MdbModalRef<EditprofilepicmodalComponent>,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.tokenService.validateToken();

  }

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    this.userService.editUserProfilePicture(this.pictureFileList[0]).subscribe(response => {
      console.log('Profile picture changed');
    });
  
    this.closeModal();
  }
  

  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    
    // Clear previous selections
    this.pictureList = [];
    this.pictureFileList = [];

    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      
      // Display the selected image
      this.pictureList.push(URL.createObjectURL(file));
      console.log('Picture List');
      console.log(this.pictureList);

      this.pictureFileList.push(file);
      console.log('Picture File List');
      console.log(this.pictureFileList);
    }
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
