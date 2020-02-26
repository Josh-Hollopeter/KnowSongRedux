import { Artist } from './../../spotifyJSON/models/artist';
import { SongstreamService } from './../../spotifyJSON/services/songstream.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/models/user.service';
import { Playlist } from 'src/app/spotifyJSON/models/playlist';
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

  constructor(
    private stream: SongstreamService,
    private userSvc: UserService
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
  }

  getUserPlaylists() {
    var authToken = this.userSvc.getUser().authToken;
    this.stream.getUserPlaylists(authToken).subscribe(
      response => {
        console.log(response);
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

}
