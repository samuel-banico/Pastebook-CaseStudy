import { Injectable } from '@angular/core';
// import { SweetAlert2Service } from '@sweetalert2/ngx-sweetalert2';  // Adjust import
import { Subject, Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
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

// ----- GEO EDIT---
    // private activity$: Observable<Event>;
    // private inactivityThreshold = 300000; // 5 minutes (adjust as needed)

    // private activitySubject = new Subject<void>();
    // private inactivitySubject = new Subject<void>();

    // constructor() {
    //     this.activity$ = merge(fromEvent(document, 'mousemove'), fromEvent(document, 'keydown')).pipe(
    //     debounceTime(300),
    //     startWith(null),
    //     map(() => {
    //         this.activitySubject.next();
    //         this.inactivitySubject.next();
    //     })
    //     );

    //     this.activity$
    //     .pipe(debounceTime(this.inactivityThreshold))
    //     .subscribe(() => this.inactivitySubject.complete());
    // }

    // startWatching() {
    //     this.activity$.subscribe();
    // }

    // stopWatching() {
    //     this.activitySubject.complete();
    //     this.inactivitySubject.complete();
    // }

    // get onIdle(): Observable<void> {
    //     return this.inactivitySubject.asObservable();
    // }

    // get onActive(): Observable<void> {
    //     return this.activitySubject.asObservable();
    // }
}
