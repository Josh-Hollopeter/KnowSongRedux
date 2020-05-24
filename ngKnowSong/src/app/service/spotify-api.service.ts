import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAPIService {

  private accessToken: string = sessionStorage.getItem('access');

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.accessToken = sessionStorage.getItem('access');
  }

  refreshAccessToken(){
    console.log("in refresh");
    this.authService.refreshAccessToken().subscribe(response => { 
     console.log(response);
     this.accessToken = <string>response;
     this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    });
    // this.authService.refreshAccessToken().pipe(map( (response) => {
    //   console.log(response);
      
    //   this.accessToken = <string>response;
    //   this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    // }));
    //keeping this here because, for some reason. i couldnt figure out why this pipe would not work, yet a subscribe DID... hnngg
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
      }),
      catchError(err => {
        if(err.status == 401){
          this.refreshAccessToken();
        }
        console.log(err);
        
        return [];
      })
    );

  }

  getTracksFromPlaylist(playlistId: string) {
    let url = "https://api.spotify.com/v1/playlists/"+ playlistId +"/tracks";

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
    );
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
    );
  }

  getAlbumsFromArtist(artistId: string) {
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums";

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
    );
  }

  getTracksFromAlbum(albumId: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=50";

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        if(event.status == 401){
          this.refreshAccessToken();
        }
        return event; 
      }),
      catchError(err => {
        if(err.status == 401){
          this.refreshAccessToken();
        }
        console.log(err);
        
        return [];
      })
    );
  }


  getAudioFeaturesTracks(csv: string){
    let url = "https://api.spotify.com/v1/audio-features/?ids=" + csv;

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
    );
  }
}
