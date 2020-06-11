import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Artist } from 'src/app/model/artist';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusicDataService } from '../data/music-data.service';
import { Track } from 'src/app/model/track';
import { Album } from 'src/app/model/album';
import { Observable, concat, Subject, empty, ReplaySubject } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AudioResolverService implements Resolve<any>{

  // toggles upon finished observables
  private hitSpotifyAgain: ReplaySubject<String> = new ReplaySubject<String>();

  constructor(
    private musicDataService: MusicDataService,
    private spotifyData: SpotifyAPIService
  ) {

    // this.spotifyData.hitSpotifyAgain.subscribe( 
    //   (response: string) => {
    //     if(response != null){
    //       this.getArtistAlbums(response);
    //     }
    //   })
  }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {

    // 1st. Populate Music Data
    const observeDataRetrieval = new Observable((observer) =>{
      observer.next(this.getArtistAlbums(undefined));

      // observer.next(this.hitSpotifyAgain.subscribe( 
      //   (newURL: string) => {
      //       console.log("getting more albums");
      //       console.log(newURL);

      //       this.getArtistAlbums(newURL);
      //   }));
      
    });

    
    return observeDataRetrieval.subscribe( () => {
      console.log("FINISHED DATA RETRIEVAL");
      
      console.log(this.musicDataService.getArtist())
      return true;
    });
    
  }

  getArtistAlbums(next?: string) {

    //get albums into array
    let artist: Artist = this.musicDataService.getArtist();
    console.log("starting getAlbumsMethod");
    
    return this.spotifyData.getAlbumsFromArtist(artist.id, next).subscribe(
      (response) => {
        console.log(response);

        let items = response["items"];

        //check if there is another page of albums!
        let next: string = response["next"];

        if(next != null){ //set observable to the next url string from spotify response
          this.hitSpotifyAgain.next(next);
        } else if(next == null){
          console.log("COMPLETE");
          this.hitSpotifyAgain.complete();
          this.hitSpotifyAgain.unsubscribe();
        }

        
        // store all albums
        for (let x = 0; x < items.length; x++) {

          let item = items[x];
          let albumId = item["id"];
          let name = item["name"];

          //skip duplicates
          if(this.musicDataService.isDuplicateAlbum(name)){
            continue;
          }

          let releaseDate = item["release_date"];
          let artSizesArray = item["images"];
          let albumPhotoObject = artSizesArray[1];
          let albumPhoto = albumPhotoObject["url"];
          let albumType = item["album_type"];

          // get all tracks
          // this.getAlbumTracks(albumId).subscribe(
          //   response => {

          //   let tracks = response;
          //   let album: Album = new Album(
          //     albumId, name, releaseDate, null, albumPhoto,
          //     albumType, null, tracks);

          //   album.tracks = tracks;
          //   //push album to arraylist

          //   this.musicDataService.addAlbum(album);
            
          // });
        }
    });

  }

  //get simplified track object. NOT audio_features
  getAlbumTracks(albumId: string): Observable<Track[]> {
    return this.spotifyData.getTracksFromAlbum(albumId).pipe(
      map( (response) => {

        let tracks = new Array<Track>();
        let items = response["items"];
        //get all track models parsed from JSON object
        for (let x = 0; x < items.length; x++) {
          let item = items[x];

          let id = item["id"];
          let name = item["name"];
          let duration = item["duration_ms"];
          let previewUrl = item["preview_url"];
          let explicit = item["explicit"];

          let track: Track = new Track(
            id, name, duration, null, previewUrl, explicit, null);

          tracks.push(track);
        }
        return tracks;
      })
    );
  }

}
