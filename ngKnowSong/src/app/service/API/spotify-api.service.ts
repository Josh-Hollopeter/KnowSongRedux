import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    this.authService.getAccessToken().subscribe(response => {
      this.httpOptions.headers.set('Authorization', `Bearer ${response}`);
    })
  }

  // if 401 (expired or invalid)
  refreshAccessToken(){
    this.authService.refreshAccessToken().subscribe(response => {
     this.httpOptions.headers.set('Authorization', `Bearer ${response}`);
    });
  }

  //----------------------
  //-  Spotify API Call  -
  //----------------------
  hitSpotify(url: string) {    
    console.log("hit spotify");
    
    return this.http.get(url, this.httpOptions).pipe(
      map( (event: HttpResponse<any>) => {
        console.log(event);
        
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

  getAlbumsFromArtist(artistId: string) {
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums?market=US&include_groups=album,single&limit=50";;
    // if(next == undefined){
    //   url = "https://api.spotify.com/v1/artists/" + artistId + "/albums?market=US&include_groups=album,single&limit=50";
    // } else{
    //   url = next;
    // }
    
    return this.hitSpotify(url); //.subscribe(
      // response  => {
      //   // let next: string = response["next"];
        
      //   // if(next != null){
      //   //   console.log("going recurisve babyy");
          
      //   //   return this.getAlbumsFromArtist(artistId, next);  // epic recursion to get all albums!
      //   console.log(response);
        
      //   return response;
      // });
  }

  getTracksFromAlbum(albumId: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=50";

    return this.hitSpotify(url);
  }


  getAudioFeaturesTracks(csv: string){
    let url = "https://api.spotify.com/v1/audio-features/?ids=" + csv;

    return this.hitSpotify(url);
  }

}
