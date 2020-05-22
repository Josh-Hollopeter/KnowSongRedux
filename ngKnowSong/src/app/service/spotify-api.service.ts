import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAPIService {
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access')}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  refreshAccessToken(){
    this.authService.refreshAccessToken().subscribe();
  }

  //---------------------
  //-  Playlist Methods -
  //---------------------
  getUserPlaylists() {
    let url = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )

  }

  getTracksFromPlaylist(playlistId: string) {
    let url = "https://api.spotify.com/v1/playlists/"+ playlistId +"/tracks";

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )
  }
  //---------------------
  //-   Artist Methods  -
  //---------------------

  searchArtist(artistName: string) {

    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5";
    
    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )
  }

  getAlbumsFromArtist(artistId: string) {
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums";

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )
  }

  getTracksFromAlbum(albumId: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=50";

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )
  }


  getAudioFeaturesTracks(csv: string){
    let url = "https://api.spotify.com/v1/audio-features/?ids=" + csv;

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      })
    )
  }
}
