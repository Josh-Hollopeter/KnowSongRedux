import { Injectable } from '@angular/core';
import { HttpHeaders, HttpBackend, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusixmatchService {

  private http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);

  }

  private apiKey:string = '&apikey=e3535a8ffb533420e0497434ea273e67';
  // api key: e3535a8ffb533420e0497434ea273e67
  // http://api.musixmatch.com/ws/1.1/track.search?q_name=

  getTrackId(trackName: string, artistName: string){
    var getNameUrl = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track='
    + trackName + '&q_artist='
    + artistName + this.apiKey;

    const httpOptions = {
      headers: new HttpHeaders({
         'Accept': 'application/json'
      })
    };

    return this.http.get(getNameUrl).pipe(
      tap((res) => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Could not retrieve lyric for /"' + trackName + '/"');
      })
    )


  }

  getTrackLyrics(trackId: string){

  }
}
