import { Component, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusixMatchService } from 'src/app/service/API/musix-match.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/model/album';
import { Subject, Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Playlist } from 'src/app/model/playlist';
import { Artist } from 'src/app/model/artist';
import { Track } from 'src/app/model/track';
import { NgForm } from '@angular/forms';
import { YearCreatorService } from 'src/app/service/Game/year-creator.service';
import { LyricCreatorService } from 'src/app/service/Game/lyric-creator.service';
import { AudioCreatorService } from 'src/app/service/Game/audio-creator.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public gameType: string;
  public albums: Album[];
  public userPlaylists: Playlist[];
  public searchArtist: Artist[];

  public artistKeyword: string;  //search for artist keyword from user input
  public keywordModelChanged: Subject<string> = new Subject<string>();
  private keywordModelChangedSubscription: Subscription;
  // private displayedColumns = ['name', 'description'];  // for playlists
  
  constructor(
    private spotifyData: SpotifyAPIService,
    private lyricService: MusixMatchService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private yearCreator: YearCreatorService,
    private lyricCreator: LyricCreatorService,
    private audioCreator: AudioCreatorService

  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(param => {
      this.gameType = param.get('gameType');
    });


    this.keywordModelChangedSubscription = this.keywordModelChanged
      .pipe(
        debounceTime(350),
        distinctUntilChanged()
      )
      .subscribe(
        text => this.searchForArtist(text)
      );
      console.log(this.gameType);
      
  }

  ngOnDestroy() {
    this.keywordModelChangedSubscription.unsubscribe();
  }
  
  //---------------------------------
  //- KNOWSONG REDUX OFFICIAL CODE  -
  //---------------------------------

  createGameForArtist(artist: Artist){
    console.log(artist.name);

    switch(this.gameType) {
      case 'audio': {
        console.log('audio');
        break;
      }
      case 'lyrics': {
        console.log('lyrics');
        break;
      }
      case 'year': {
        console.log('year');
        break;
      }
    }
  }



  //-------------------------
  //- User Playlist Methods -
  //-------------------------
  getUserPlaylists() {

    this.spotifyData.getUserPlaylists().subscribe(
      response => {
        // console.log(response);
        var items = response["items"];
        this.userPlaylists = new Array();
        for (let x = 0; x < items.length; x++) {
          var item = items[x];
          //get spotify id for following query
          var id = item["id"];
          //get playlist name
          var name = item["name"];
          //get playlist description
          var description = item["description"];

          var playlist = new Playlist(id, name, description);
          this.userPlaylists.push(playlist);
        }

      }
    )
  }

  getTracksFromPlaylist(playlistId: string) {

    this.spotifyData.getTracksFromPlaylist(playlistId).subscribe(
      response => {

      }
    )

  }

  //-------------------------
  //- Artist Search Methods -
  //-------------------------
  searchForArtist(keyword: string) {

    this.spotifyData.searchArtist(keyword).subscribe(
      response => {
        console.log(response);
        
        var array = response["artists"];
        var items = array["items"];
        // instantiate artist array to length of result
        this.searchArtist = new Array();

        //get individual artist
        for (let x = 0; x < items.length; x++) {
          var item = items[x];

          //get artist ID
          var id = item["id"];

          // get name
          var name = item["name"];
          // console.log(item);

          // get image
          if (item["images"].length < 1) {
            var img = null;
          } else {
            let imgs: any[] = item["images"];
            let firstImg = imgs[0];
            var img = firstImg["url"];
          }

          // display artist array to user
          var artist: Artist = new Artist(id, name, img);

          this.searchArtist.push(artist);

        }
      }
    )
  }


  getArtistAlbums(artist: Artist) {

    //get albums into array
    this.albums = new Array();
    //this is a simplified object
    // it does not provide:
    // popularity
    // genres
    // tracks
    this.spotifyData.getAlbumsFromArtist(artist.id).subscribe(
      response => {
        var items = response["items"];

        //big overhead on server
        for (let x = 0; x < items.length; x++) {

          var item = items[x];
          console.log(item);

          //only get albums, ignore singles and compilations
          if (item["album_type"] != 'album') {
            continue;
          }
          var id = item["id"];
          var name = item["name"];
          var releaseDate = item["release_date"];

          let artSizesArray = item["images"];
          let albumPhotoObject = artSizesArray[1];
          var albumPhoto = albumPhotoObject["url"];

          var albumType = item["type"];
          var tracks: Track[] = this.getAlbumTracks(id);
          var album: Album = new Album(
            id, name, releaseDate, null, albumPhoto,
            albumType, null, artist, tracks);


          console.log("Before get track stream");

          album.tracks = tracks;

          //push album to arraylist

          this.albums.push(album);
          console.log(this.albums);
        }
        var putAlbum = () => {
          console.log("****" + this.albums + "********in create game");
          // this.data.storage = this.albums;
          this.router.navigateByUrl('game/')

        }
        setTimeout(putAlbum, 2500);

      }
    )
  }
  //get simplified track object. NOT audio_features
  getAlbumTracks(albumId: string): Track[] {

    var tracks: Track[] = new Array();

    console.log("Before get track stream");

    this.spotifyData.getTracksFromAlbum(albumId).subscribe(
      response => {

        var items = response["items"];

        for (let x = 0; x < items.length; x++) {
          var item = items[x];

          var id = item["id"];
          var name = item["name"];
          var duration = item["duration_ms"];
          var popularity = null;
          var previewUrl = item["preview_url"];
          var explicit = item["explicit"];
          // var album = album;

          var track: Track = new Track(
            id, name, duration, popularity, previewUrl, explicit, null);

          tracks.push(track);
          // console.log("In for loop : " + track);

        }

      }
    )
    //need a delay here
    return tracks;
  }


  //quick test form for getting lyrics for a track


  getLyrics(form: NgForm) {
    var trackName: string = form.value.trackName;
    var artistName: string = form.value.artistName;


    this.lyricService.getLyrics(trackName, artistName).subscribe(
      response => {
        console.log(response);

        let message = response["message"];
        let body = message["body"];
        //check if no lyrics matched
        let length = body["length"];
        if(length == 0){
          console.log("No lyrics");
        }

        let lyrics = body["lyrics"];
        let lyricsBody = lyrics["lyrics_body"];
        console.log(lyricsBody);

        //regex to get first 7 lines
        let lyricLines = lyricsBody.split('\n', 10);
        var finishedLyrics = "";
        for (let y = 0; y < lyricLines.length; y++) {
          if(y == 0){
            finishedLyrics += lyricLines[y];
          } else{
            finishedLyrics += "\n";
            finishedLyrics += lyricLines[y];
          }
        }
        console.log(finishedLyrics);





        // tracks[x].lyrics = lyricsBody;


      }
    )
  }
}
