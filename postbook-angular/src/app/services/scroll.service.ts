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
    this.loadVisibleData();
  }

  getVisibleData() {
    return this.visibleDataSubject.asObservable();
  }

  loadData() {
    const nextData = this.data.slice(this.visibleDataSubject.value.length, this.visibleDataSubject.value.length + 7);
    
    if (nextData.length > 0) {
      this.visibleDataSubject.next([...this.visibleDataSubject.value, ...nextData]);
    }else {}
  }

  private loadVisibleData() {
    const initialData = this.data.slice(0, 4);
    this.visibleDataSubject.next(initialData);
  }
}
