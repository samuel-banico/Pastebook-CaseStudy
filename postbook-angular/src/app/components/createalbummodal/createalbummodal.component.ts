import { Component, Input,ElementRef, ViewChild  } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';



@Component({
  selector: 'app-createalbummodal',
  templateUrl: './createalbummodal.component.html',
  styleUrls: ['./createalbummodal.component.css']
})
export class CreatealbummodalComponent {
  @Input() input1: string = '';
  @Input() input2: string = '';
  pictureList: string[] = [];
  constructor(public modalRef: MdbModalRef<CreatealbummodalComponent>) {}

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  closeModal() {
    this.modalRef.close();
  }

  saveData() {
    // Implement your save logic here
    console.log('Data saved:', this.input1, this.input2);
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
      }
    }
  }

 
}
