import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Album } from '@models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumUrl: string = 'https://localhost:7185/api/albums';
  private albumImageUrl: string = 'https://localhost:7185/api/albumImage'

  constructor(
    private http: HttpClient
  ) { }

  createAlbum(album: Album): Observable<object> {
    return this.http.post(this.albumUrl, album);
  }

  createAlbumImage(image: File, albumId: number) : Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.albumImageUrl+`?albumId=${albumId}`, formData);
  }
}
