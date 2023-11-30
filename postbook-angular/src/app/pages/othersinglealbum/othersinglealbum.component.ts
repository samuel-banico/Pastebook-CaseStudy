import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddphotomodalComponent } from '@components/addphotomodal/addphotomodal.component';
import { EditAlbumModalComponent } from '@components/edit-album-modal/edit-album-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SessionService } from '@services/session.service';
import { AlbumService } from '@services/album.service';
import { DataTransferService } from '@services/data-transfer.service';
import { TokenService } from '@services/token.service';
import { Album } from '@models/album';
import { SinglephotomodalComponent } from '@components/singlephotomodal/singlephotomodal.component';

@Component({
    selector: 'app-othersinglealbum',
    templateUrl: './othersinglealbum.component.html',
    styleUrls: ['./othersinglealbum.component.css']
})
export class OthersinglealbumComponent implements OnInit {
    modalRefAddPhoto: MdbModalRef<AddphotomodalComponent> | null = null;
    modalRefSinglePhoto: MdbModalRef<SinglephotomodalComponent> | null = null;
    modalRefEditPhoto: MdbModalRef<AddphotomodalComponent | EditAlbumModalComponent> | null = null;

    albumId: string = "";
    album: Album = new Album;
    isEditing: boolean = false;
    albumName: string = 'Album Name Here';
    editedAlbumName: string = '';

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private modalService: MdbModalService,
        private tokenService: TokenService,
        private albumService: AlbumService
    ){
        this.tokenService.validateToken();
        
        this.albumId = this.sessionService.getAlbum();

        console.log(this.albumId);
        this.loadData();
    }

    ngOnInit(): void {
    }

    loadData() {
        console.log('start');
        this.albumService.getAlbumById(this.albumId).subscribe(( a : any ) => {
            this.album = a;
            console.log(this.album.imageList);
            console.log(a);

        });
    }

    confirmDelete() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.albumService.deleteAlbum(this.albumId).subscribe(
                    () => {
                        Swal.fire(
                            'Deleted!',
                            'Your album has been deleted.',
                            'success'
                        ).then( a => {
                            this.router.navigate(['profile']);
                        });

                    },
                    (error) => {
                        console.error('Error deleting album:', error);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the album.',
                            'error'
                        );
                    }
                );
            }
        });
    }
    

    toggleEdit() {
        this.isEditing = !this.isEditing;
        if (this.isEditing) {
            // Copy the current album name to the editedAlbumName variable
            this.editedAlbumName = this.albumName;
        }
    }

    saveEdit() {
        this.albumName = this.editedAlbumName;
        this.isEditing = false;

        Swal.fire(
            'Edited!',
            'Your album name has been updated.',
            'success'
        );
    }

    openModalAddPhoto(){
        console.log(this.albumId);
        this.modalRefAddPhoto = this.modalService.open(AddphotomodalComponent)
    }

    openSinglePhotoModal(){
        this.modalRefSinglePhoto = this.modalService.open(SinglephotomodalComponent)
    }
    
    openModal() {
        this.modalRefEditPhoto = this.modalService.open(EditAlbumModalComponent)
    }
}
