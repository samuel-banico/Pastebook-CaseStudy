import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createAlbum(album: Album, token: string): Observable<object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });

    return this.http.post(this.albumUrl, album, { headers });
  }

  createAlbumImage(albumId: number, image: File) : Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.albumImageUrl+`?albumId=${albumId}`, formData);
  }

  assignCoverImageToAlbum(albumId: number, image: File) : Observable<object> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(this.albumUrl+`/addCoverPhoto?albumId=${albumId}`, formData);
  }
}
