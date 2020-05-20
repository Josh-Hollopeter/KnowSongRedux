import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusixMatchService {

  constructor(private http: HttpClient) { }


  private apiKey: string = '&apikey=e3535a8ffb533420e0497434ea273e67';

  getLyrics(trackName: string, artistName: string) {
    var getNameUrl = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track='
      + trackName + '&q_artist='
      + artistName + this.apiKey;

    return this.http.jsonp(getNameUrl, 'callback').pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve lyric for /"' + trackName + '/"');
      })
    )
  }
}
