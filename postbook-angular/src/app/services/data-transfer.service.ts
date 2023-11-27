import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  // This service general use is to transfer data from one component to another
  data: any;
  constructor() { }
}
