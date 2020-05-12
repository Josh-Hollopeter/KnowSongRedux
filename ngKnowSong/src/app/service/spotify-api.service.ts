import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private http: HttpClient
  ) { 
    this.accessToken = localStorage.getItem('AccessToken');
    
  }


  //---------------------
  //-  Playlist Methods -
  //---------------------
  getUserPlaylists() {
    let url = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve Playlists from current user');
      })
    )

  }

  getTracksFromPlaylist(playlistId: string) {
    let url = "https://api.spotify.com/v1/playlists/"+ playlistId +"/tracks";

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve tracks from playlist');
      })
    )
  }
  //---------------------
  //-   Artist Methods  -
  //---------------------

  searchArtist(artistName: string) {

    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5";

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {

        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve artist from spotify API');
      })
    )
  }

  getAlbumsFromArtist(artistId: string) {
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums";

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve albums from artist');
      })
    )

  }

  getTracksFromAlbum(albumId: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=50";

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('could not get tracks from album');
      })
    )
  }


  getAudioFeaturesTracks(csv: string){
    let url = "https://api.spotify.com/v1/audio-features/?ids=" + csv;

    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('could not get tracks from album');
      })
    )
  }
}
