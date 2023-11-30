import { Injectable } from '@angular/core';
import { Post } from '@models/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private data: Post[] = [];
  private visibleDataSubject = new BehaviorSubject<Post[]>([]);

  constructor() { }

  initializeData(receivedData: Post[]) {
    this.data = receivedData;

    if(receivedData.length > 0) {
      this.loadVisibleData();
    }
  }

  getVisibleData() {
    return this.visibleDataSubject.asObservable();
  }

  loadData() {
    const nextData = this.data.slice(this.visibleDataSubject.value.length, this.visibleDataSubject.value.length + 10);
    
    if (nextData.length > 0) {
      this.visibleDataSubject.next([...this.visibleDataSubject.value, ...nextData]);
    }else {}
  }

  private loadVisibleData() {
    const initialData = this.data.slice(0, 10);
    this.visibleDataSubject.next(initialData);
  }
}
