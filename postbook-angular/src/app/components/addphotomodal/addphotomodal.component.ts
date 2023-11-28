import { Component, ElementRef, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';



@Component({
  selector: 'app-addphotomodal',
  templateUrl: './addphotomodal.component.html',
  styleUrls: ['./addphotomodal.component.css']
})
export class AddphotomodalComponent {
  pictureList: string[] = [];
  pictureFileList: File[] = [];
 
  id: number = 0;

  constructor(
    public modalRef: MdbModalRef<AddphotomodalComponent>,
    
  ) {}

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    

    console.log('Data saved:');
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
        console.log('Picture List');
        console.log(this.pictureList);

        this.pictureFileList.push(file);
        console.log('Picture File List');
        console.log(this.pictureFileList);
      }
    }
  }
}
