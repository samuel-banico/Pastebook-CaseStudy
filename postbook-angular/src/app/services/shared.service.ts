import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSavedSource = new Subject<void>();
  dataSaved$ = this.dataSavedSource.asObservable();

  emitDataSaved(): void {
    this.dataSavedSource.next();
  }
}
