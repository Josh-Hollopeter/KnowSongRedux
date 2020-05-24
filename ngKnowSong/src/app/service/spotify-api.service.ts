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
  ) {}

  refreshAccessToken(){
    this.authService.refreshAccessToken().subscribe(response => {
     this.accessToken = <string>response;
     this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    });
    // this.authService.refreshAccessToken().pipe(map( (response) => {
    //   console.log(response);

    //   this.accessToken = <string>response;
    //   this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);
    // }));
    //keeping this here because, for some reason. i couldnt figure out why this pipe would not even be called, yet a subscribe DID... hnngg
  }

  hitSpotify(url: string) {

    return this.http.get(url, this.httpOptions).pipe(
      map((event: HttpResponse<any>)=> {
        return event;
      }),
      catchError(err => {
        if(err.status == 401){
          this.refreshAccessToken();
        }
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
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums";

    return this.hitSpotify(url);
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
