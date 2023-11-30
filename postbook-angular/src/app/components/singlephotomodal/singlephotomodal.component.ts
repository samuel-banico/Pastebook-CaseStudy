import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgModule } from '@angular/core';

import { SessionService } from '@services/session.service';
import { AlbumService } from '@services/album.service';
import { AlbumImage } from '@models/album';



@Component({
  selector: 'app-singlephotomodal',
  templateUrl: './singlephotomodal.component.html',
  styleUrls: ['./singlephotomodal.component.css']
})
export class SinglephotomodalComponent implements OnInit{
  showComments = false;
  albumImage: AlbumImage = new AlbumImage();
  imageId: string = "";
  // Mock comments data, replace with your actual data
  comments = [
    { user: 'Dingdong Dentist', text: 'kamukha ni christian deyto hehe yung anak ni rey untal' }
  ];

  constructor(
    private sessionService: SessionService,
    private albumService: AlbumService
  ){
    this.imageId = this.sessionService.getAlbumImage();
    
    this.getImage();    
  }

  ngOnInit(): void {
    
  }

  toggleLike() {
    // Add your logic for liking
    console.log('Liked!');
  }

  toggleCommentsVisibility() {
    this.showComments = !this.showComments;
  }

  getImage(){
    this.albumService.getAlbumImageById(this.imageId).subscribe((i : any)=>{
      this.albumImage = i;
      console.log(this.albumImage.id);
    });
  }
}