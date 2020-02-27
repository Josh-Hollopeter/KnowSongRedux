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

  // U R L
  // private artistUrl: string = "https://api.spotify.com/v1/artists/";
  //  private artistAlbums: string = "https://api.spotify.com/v1/artists/{id}/albums";


  // M E T H O D S

  searchArtist(artistName: string, authToken: string) {

    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        // 'Accept': 'text/plain'
      })
    };
    return this.http.get<Artist[]>(url, httpOptions).pipe(
      tap((res) => {

        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve artist from spotify API');
      })
    )
  }

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

  getTracksFromPlaylist(id: string){


  }
}


