import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAPIService {

  private accessToken: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.accessToken = localStorage.getItem('access');
  }

  refreshAccessToken(){
    console.log("in refresh");
    
    this.authService.refreshAccessToken().pipe(map((response) => {
      this.accessToken = <string>response;
      this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    }));
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
        return event; 
      }),
      catchError(err => {
        if(err.status == 401){
          this.refreshAccessToken();
        }
        console.log(err);
        
        return [];
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
