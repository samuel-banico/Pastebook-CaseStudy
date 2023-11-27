import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AddphotomodalComponent } from '@components/addphotomodal/addphotomodal.component';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SessionService } from '@services/session.service';
import { AlbumService } from '@services/album.service';
import { DataTransferService } from '@services/data-transfer.service';
import { TokenService } from '@services/token.service';

import { Album } from '@models/album';

@Component({
    selector: 'CreateAlbumComponent',
    templateUrl: './create-album.component.html',
    styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
    modalRef: MdbModalRef<AddphotomodalComponent> | null = null;

    constructor(
        private router: Router,

        private sessionService: SessionService,
        private modalService: MdbModalService,
        private dataTransferService: DataTransferService,
        private tokenService: TokenService,
        private albumService: AlbumService
    ){
        this.tokenService.validateToken();
        
        this.albumId = this.dataTransferService.data;
        if(!this.albumId) {
            Swal.fire('Server Error', 'Something happened lets go back', 'info').then( a => {
                this.router.navigate(['albums']);
            })
        }
    }

    ngOnInit(): void {
        
        console.log(this.albumId);
        this.albumService.getAlbumById(this.albumId).subscribe(( a : any ) => {
            this.album = a;
            console.log(this.album);
        });

    }

    albumId: string = "";
    album: Album = new Album;
    isEditing: boolean = false;
    albumName: string = 'Album Name Here';
    editedAlbumName: string = '';
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
                // Perform the actual deletion here
                // You can call a service method to delete data or perform any other necessary action
                Swal.fire(
                    'Deleted!',
                    'Your album has been deleted.',
                    'success'
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

    openModalAddPhoto() {
        this.modalRef = this.modalService.open(AddphotomodalComponent)
      }
}
