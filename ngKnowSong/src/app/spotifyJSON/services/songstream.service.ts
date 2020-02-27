import { Artist } from './../models/artist';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/models/user.service';

@Injectable({
  providedIn: 'root'
})
export class SongstreamService {
  // F I E L D S
  private searchUrl: string;
  private artistUrl: string;
  private artistData: string;
  private playlist: object[];
  private user: User;
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);

  }


  //---------------------
  //-  Playlist Methods -
  //---------------------
  getUserPlaylists(authToken: string) {
    let url = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };
    return this.http.get(url, httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve Playlists from current user');
      })
    )

  }

  getTracksFromPlaylist(playlistId: string, authToken: string) {
    let url = "https://api.spotify.com/v1/playlists/"+ playlistId +"/tracks";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };
    return this.http.get(url, httpOptions).pipe(
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

  searchArtist(artistName: string, authToken: string) {

    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };
    return this.http.get(url, httpOptions).pipe(
      tap((res) => {

        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve artist from spotify API');
      })
    )
  }

  getAlbumsFromArtist(artistId: string, authToken: string) {
    let url = "https://api.spotify.com/v1/artists/" + artistId + "/albums";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };


    return this.http.get(url, httpOptions).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve albums from artist');
      })
    )

  }

  getTracksFromAlbum(albumId: string, authToken: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=50";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };

    return this.http.get(url, httpOptions).pipe(
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


