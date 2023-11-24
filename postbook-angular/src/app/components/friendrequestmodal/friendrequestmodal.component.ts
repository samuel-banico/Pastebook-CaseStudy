import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friendrequestmodal',
  templateUrl: './friendrequestmodal.component.html',
  styleUrls: ['./friendrequestmodal.component.css']
})
export class FriendrequestmodalComponent {
  constructor(public modalRef: MdbModalRef<FriendrequestmodalComponent>) {}
  
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  Accept(): void {
    Swal.fire({
      title: 'New friend alert!',
      text: 'User.name is now your friend',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Visit Profile',
      cancelButtonText: 'Close'
    })
    // .then((result) => 
    //     this.router.navigate(['/login']); // Optionally navigate to the login page after logout
    //   }
    // })
    ;
  }

  Reject(): void {
    Swal.fire({
      title: 'Friend request rejected',
      text: 'You rejected user.name friend request',
      icon: 'error',
      // confirmButtonText: 'Yes, logout!',
    })
    // .then((result) => 
    //     this.router.navigate(['/login']); // Optionally navigate to the login page after logout
    //   }
    // })
    ;
  }
}
