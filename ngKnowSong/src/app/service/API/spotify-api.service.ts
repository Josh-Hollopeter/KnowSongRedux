import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, retryWhen } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAPIService {
  
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access')}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    if(sessionStorage.getItem('access') == null){
      this.getAccessToken();
    }
  }

  //------------------------------
  //-  Automatic Token Retrieval -
  //------------------------------
  // if session storage token removed by user or other errors
  getAccessToken(){
    this.authService.getAccessToken().subscribe(
      response => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${response}`
          })
        }
      }
    );
  }

  // if 401 (expired or invalid)
  refreshAccessToken(){
    this.authService.refreshAccessToken().subscribe(
      response => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${response}`
          })
        }
      }
    );
  }

  //----------------------
  //-  Spotify API Call  -
  //----------------------
  hitSpotify(url: string) {  
    return this.http.get(url, this.httpOptions).pipe(
      map( (event: HttpResponse<any>) => {
        return event;
      }),
      catchError(err => {
        if(err.status == 401){
          this.refreshAccessToken();
        }
        if(err.status == 429){
          console.log("EXCEEDED SPOTIFY API REQUEST LIMIT T_T");
        }
        console.log(err);
        
        return [];
      })//,
      // retryWhen(errors =>)
    );

  }

  //---------------------
  //-  Playlist Methods -
  //---------------------
  getUserPlaylists() {
    let url = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";

    return this.hitSpotify(url);
  }

  getTracksFromPlaylist(playlistId: string) {
    let url = "https://api.spotify.com/v1/playlists/"+ playlistId +"/tracks";

    return this.hitSpotify(url);
  }

  //---------------------
  //-   Artist Methods  -
  //---------------------
  searchArtist(artistName: string) {
    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5";

    return this.hitSpotify(url);
  }
}
