import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'CreateAlbumComponent',
    templateUrl: './create-album.component.html',
    styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent {

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
}
