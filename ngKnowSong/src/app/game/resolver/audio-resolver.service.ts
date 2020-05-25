import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Artist } from 'src/app/model/artist';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusicDataService } from '../data/music-data.service';
import { Track } from 'src/app/model/track';
import { Album } from 'src/app/model/album';
import { Observable, concat, Subject, empty } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AudioResolverService implements Resolve<any>{

  // toggles upon finished observables
  private albumsLoaded: boolean;

  constructor(
    private musicDataService: MusicDataService,
    private spotifyData: SpotifyAPIService
  ) {}
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    

    // 1st. Populate Music Data
    const observeDataRetrieval = new Observable((observer) =>{
      observer.next(this.getArtistAlbums());
      observer.next(console.log(this.musicDataService.getArtist()));
      observer.complete();
    });
    observeDataRetrieval.subscribe();

    return empty();
  }

  getArtistAlbums() {

    //get albums into array
    let artist: Artist = this.musicDataService.getArtist();
    console.log("hlelo?");
    return this.spotifyData.getAlbumsFromArtist(artist.id).pipe( map( 
      (response) => {
        console.log(response);
        
        let items = response["items"];
        // let next: string = response["next"];  // there are more than 50 albums/singles
        // if(next != null){

        // }

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
          this.getAlbumTracks(albumId).subscribe( 
            response => { 
            
            let tracks = response;
            let album: Album = new Album(
              albumId, name, releaseDate, null, albumPhoto,
              albumType, null, tracks);
  
            album.tracks = tracks;
            //push album to arraylist
  
            this.musicDataService.addAlbum(album);
            console.log(this.musicDataService.getArtist());
          });
        }
    })
    );
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
