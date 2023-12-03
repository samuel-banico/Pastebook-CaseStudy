import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Album, AlbumImageComment, AlbumImageLike } from '@models/album';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumUrl: string = 'https://localhost:7185/api/albums';
  private albumImageUrl: string = 'https://localhost:7185/api/albumImage'
  private albumImageLikeUrl: string = 'https://localhost:7185/api/albumImageLike'
  private albumImageCommentUrl: string = 'https://localhost:7185/api/albumImageComment'

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `${this.sessionService.getToken()}`
  })


  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }
  
  // GET
  getAllUserAlbum(): Observable<object> {
    return this.http.get(this.albumUrl + '/allAlbumByUser', {headers: this.headers});
  }

  getAlbumById(albumId: string): Observable<object> {
    return this.http.get(this.albumUrl + `?albumId=${albumId}`, {headers: this.headers});
  }

  // POST
  createAlbum(album: Album): Observable<object> {
    return this.http.post(this.albumUrl, album, { headers: this.headers });
  }
  
  getAllFriendAlbum(albumId: string): Observable<object>{
    return this.http.get(this.albumUrl + `/allAlbumByOther?retrievedUserId=${albumId}`, {headers: this.headers});
  }

  createAlbumImage(albumId: string, image: File) : Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.albumImageUrl+`?albumId=${albumId}`, formData);
  }
  
  getAlbumImageById(imageId: string): Observable<object> {
    return this.http.get(this.albumImageUrl+`?id=${imageId}`, {headers:this.headers});
  }

  assignCoverImageToAlbum(albumId: string, image: File) : Observable<object> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(this.albumUrl+`/addCoverPhoto?albumId=${albumId}`, formData);
  }

  //PUT Edit Album Image
  editAlbum(album: Album): Observable<Album>{
    return this.http.put<Album>(this.albumUrl, album)
  }

  deleteAlbum(albumId: string): Observable<object> {
    const params = new HttpParams()
        .set('albumId', albumId);
    return this.http.delete(this.albumUrl, {params});
  }

  // Like
  addLike(albumImageLike: AlbumImageLike): Observable<any> {
    console.log(albumImageLike);

    return this.http.post(this.albumImageLikeUrl + '/likeAlbumImage', albumImageLike, {headers: this.headers})
  }

  removeLike(albumImageId: string): Observable<any> {
    console.log(albumImageId);
    const params = new HttpParams()
        .set('albumImageId', albumImageId)

    return this.http.delete(this.albumImageLikeUrl + '/unlikeAlbumImage', {headers: this.headers, params})
  }

  // Comments
  addComment(albumImageComment: AlbumImageComment): Observable<Object>{      
    return this.http.post(this.albumImageCommentUrl + '/commentAlbumImage', albumImageComment, { headers: this.headers});
  };

  getComments(): Observable<AlbumImageComment[]>{
    return this.http.get<AlbumImageComment[]>(this.albumImageCommentUrl + '/allAlbumImageComments', {headers: this.headers})
  };

}
