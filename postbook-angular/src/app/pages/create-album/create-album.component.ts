import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddphotomodalComponent } from '@components/addphotomodal/addphotomodal.component';

import { SessionService } from '@services/session.service';

@Component({
    selector: 'CreateAlbumComponent',
    templateUrl: './create-album.component.html',
    styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
    modalRef: MdbModalRef<AddphotomodalComponent> | null = null;

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private modalService: MdbModalService
    ){
        let token: string = this.sessionService.getToken();
        if(!token) {
            this.router.navigate(['page-not-found']);
        }
    }

    ngOnInit(): void {
        
    }
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
