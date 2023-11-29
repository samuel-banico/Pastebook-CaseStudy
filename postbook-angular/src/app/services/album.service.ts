import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Album } from '@models/album';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumUrl: string = 'https://localhost:7185/api/albums';
  private albumImageUrl: string = 'https://localhost:7185/api/albumImage'
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })


  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }
  
  // GET
  getAllUserAlbum(): Observable<object> {
    return this.http.get(this.albumUrl + '/allAlbumByUser', {headers: this.headers})
  }

  getAlbumById(albumId: string): Observable<object> {
    return this.http.get(this.albumUrl + `?albumId=${albumId}`);
  }

  // POST
  createAlbum(album: Album): Observable<object> {
    return this.http.post(this.albumUrl, album, { headers: this.headers });
  }

  createAlbumImage(albumId: string, image: File) : Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.albumImageUrl+`?albumId=${albumId}`, formData);
  }

  assignCoverImageToAlbum(albumId: string, image: File) : Observable<object> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(this.albumUrl+`/addCoverPhoto?albumId=${albumId}`, formData);
  }
  //PUT Edit Album Image
  editAlbum(album:Album): Observable<Album>{
    return this.http.put<Album>(this.albumUrl,album, {headers:this.headers})
  }
}
