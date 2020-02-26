import { SongstreamService } from './../../spotifyJSON/services/songstream.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/models/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  // F I E L D S
  artistStr: string;
  searchResult: Object[];
  user: User = new User();
  constructor(
    private stream: SongstreamService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.userSvc.show().subscribe(

      yes => {
        console.log(yes);
        this.user.authToken = yes["authToken"];
        // this.user.rank
        this.user.username = yes["username"];
        console.log(this.user);
        this.userSvc.setUser(this.user);
      },
      no => {
        console.error("in user home init")
        console.error(no);
      }
    )
  }

  searchForArtist() {
    console.log(this.userSvc.getUser());
    var authToken = this.userSvc.getUser().authToken;
    this.stream.searchArtist(this.artistStr, authToken).subscribe(
      response => {
        // this.searchResult = response["name"];
        console.log(response);

      }
    )
  }

}
