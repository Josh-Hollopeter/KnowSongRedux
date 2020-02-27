import { DataService } from './../../injectable/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from './../../spotifyJSON/models/artist';
import { SongstreamService } from './../../spotifyJSON/services/songstream.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/models/user.service';
import { Playlist } from 'src/app/spotifyJSON/models/playlist';
import { Album } from 'src/app/spotifyJSON/models/album';
import { Track } from 'src/app/spotifyJSON/models/track';
import { timer } from 'rxjs';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  // F I E L D S

  artistStr: string;
  searchResult: Artist[];

  userPlaylists: Playlist[];
  private user: User = new User();

  displayedColumns = ['name', 'description'];
  dataSource = this.userPlaylists;

  // I N F O
  private albums: Album[];

  constructor(
    private stream: SongstreamService,
    private userSvc: UserService,
    private aRoute: ActivatedRoute,
    private router: Router, private data: DataService
  ) { }


  // M E T H O D S

  ngOnInit(): void {
    this.userSvc.show().subscribe(

      yes => {
        this.user.authToken = yes["authToken"];
        // this.user.rank
        this.user.username = yes["username"];
        this.userSvc.setUser(this.user);
      },
      no => {
        console.error("in user home init")
        console.error(no);
      }
    )

    var artistsStorage = [];
    artistsStorage.push(JSON.parse(localStorage.getItem('session')));
    localStorage.setItem('session', JSON.stringify(artistsStorage));

  }



  selectResults() {
    this.data.storage = this.getArtistAlbums(this.searchResult[0]);
    this.router.navigateByUrl('game/')

  }
  //-------------------------
  //- User Playlist Methods -
  //-------------------------
  getUserPlaylists() {
    var authToken = this.userSvc.getUser().authToken;
    this.stream.getUserPlaylists(authToken).subscribe(
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
    var authToken = this.userSvc.getUser().authToken;
    this.stream.getTracksFromPlaylist(playlistId, authToken).subscribe(
      response => {

      }
    )

  }

  //-------------------------
  //- Artist Search Methods -
  //-------------------------
  searchForArtist() {
    var authToken = this.userSvc.getUser().authToken;
    this.stream.searchArtist(this.artistStr, authToken).subscribe(
      response => {

        var array = response["artists"];
        var items = array["items"];
        // instantiate artist array to length of result
        this.searchResult = new Array();

        //get individual artist
        for (let x = 0; x < items.length; x++) {
          var item = items[x];

          //get artist ID
          var id = item["id"];

          // get name
          var name = item["name"];
          console.log(item);

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

          this.searchResult.push(artist);

        }
      }
    )
  }


  getArtistAlbums(artist: Artist) {
    var authToken = this.userSvc.getUser().authToken;
    //get albums into array
    this.albums = new Array();
    //this is a simplified object
    // it does not provide:
    // popularity
    // genres
    // tracks
    this.stream.getAlbumsFromArtist(artist.id, authToken).subscribe(
      response => {
        var items = response["items"];

        //big overhead on server
        for (let x = 0; x < items.length; x++) {
          var item = items[x];
          var id = item["id"];
          var name = item["name"];
          var releaseDate = item["release_date"];

          let artSizesArray = item["images"];
          let albumPhotoObject = artSizesArray[1];
          var albumPhoto = albumPhotoObject["url"];

          var albumType = item["type"];

          var album: Album = new Album(
            id, name, releaseDate, null, albumPhoto,
            albumType, null, artist, null);

          //run method below, heavy overhead on server
          var tracks: Track[] = this.getAlbumTracks(album);
          album.tracks = tracks;


          //push album to arraylist
          this.albums.push(album);
          console.log(this.albums);

        }
      }
    )
  }
  //get simplified track object. NOT audio_features
  getAlbumTracks(album: Album): Track[] {
    var authToken = this.userSvc.getUser().authToken;
    var tracks: Track[] = new Array();

    this.stream.getTracksFromAlbum(album.id, authToken).subscribe(
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
          var album = album;

          var track: Track = new Track(
            id, name, duration, popularity, previewUrl, explicit, album);

          tracks.push(track);
        }

      }
    )
    //need a delay here
    return tracks;
  }

}
