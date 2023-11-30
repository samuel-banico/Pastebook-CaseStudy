// import { Injectable } from '@angular/core';
// import { SweetAlert2Service } from '@sweetalert2/ngx-sweetalert2';  // Adjust import

// @Injectable({
//   providedIn: 'root',
// })
// export class IdleService {
//   constructor(private sweetAlertService: SweetAlert2Service) {
//     this.configureIdle();
//   }

//   private configureIdle(): void {
//     // Your idle configuration here

//     // Subscribes to the idle timeout event
//     // For demonstration, a simple alert is shown
//     setTimeout(() => {
//       this.showAlert();
//     }, 5000);  // Adjust the time as needed
//   }

//   private showAlert(): void {
//     this.sweetAlertService.fire({
//       title: 'Idle Alert',
//       text: 'You have been idle for 5 minutes.',
//       icon: 'warning',
//       confirmButtonText: 'OK',
//     });
//   }
// }
