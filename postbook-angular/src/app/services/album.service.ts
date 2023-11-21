import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Album } from '@models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl: string = 'https://localhost:7185/api/albums';

  constructor(
    private http: HttpClient
  ) { }

  createAlbum(album: Album): Observable<object> {
    return this.http.post(this.baseUrl, album);
  }
}
