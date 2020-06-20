import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusixMatchService } from 'src/app/service/API/musix-match.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MusicDataService } from 'src/app/game/data/music-data.service';
import { newArray } from '@angular/compiler/src/util';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Artist } from 'src/app/model/artist';
import { AuthService } from 'src/app/service/API/auth.service';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  @ViewChildren('input') inputBox;

  public gameType: string;
  // public userPlaylists: Playlist[];

  private loading: boolean;
  public artistKeyword: string;  //search for artist keyword from user input
  public keywordModelChanged: Subject<string> = new Subject<string>();
  private keywordModelChangedSubscription: Subscription;
  public searchArtist: Artist[];
  // private displayedColumns = ['name', 'description'];  // for playlists

  constructor(
    private spotifyData: SpotifyAPIService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private musicDataService: MusicDataService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    ViewEncapsulation.ShadowDom;

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
  }

  ngAfterViewInit(){
    this.inputBox.first.nativeElement.focus();
  }

  ngOnDestroy() {
    this.keywordModelChangedSubscription.unsubscribe();
  }

  //---------------------------------
  //- KNOWSONG REDUX OFFICIAL CODE  -
  //---------------------------------

  createGameForArtist(artist: Artist){
    
    this.musicDataService.removeArtist(); // by default we assume you are choosing a new artist, this can be changed later to check if same artist, which will save us from doing unnecessary api calls. and just generating a new game!
    this.musicDataService.setArtist(artist);
    this.loading = true;
    switch(this.gameType) {
      case 'Audio Clips': {
        this.router.navigate(['audio']);
        break;
      }
    }
  }

  //-------------------------
  //- Artist Search Method -
  //-------------------------
  searchForArtist(keyword: string) {
    this.spotifyData.searchArtist(keyword).subscribe(
      response => {
        let array = response["artists"];
        let items = array["items"];
        // instantiate artist array to length of result
        this.searchArtist = new Array();

        //get individual artist
        for (let x = 0; x < items.length; x++) {
          let item = items[x];

          let id = item["id"];
          let name = item["name"];

          // get image
          let img: string;
          if (item["images"].length < 1) {
            img = null;
          } else {
            let imgs: any[] = item["images"];
            let firstImg = imgs[0];
            img = firstImg["url"];
          }

          // display artist array to user
          let artist: Artist = new Artist(id, name, img);
          this.searchArtist.push(artist);
        }
      }
    );
  }




  //------------------------------------------------------------------------------------
  //-------------------------
  //- User Playlist Methods -
  //-------------------------
  // getUserPlaylists() {

  //   this.spotifyData.getUserPlaylists().subscribe(
  //     response => {
  //       // console.log(response);
  //       var items = response["items"];
  //       this.userPlaylists = new Array();
  //       for (let x = 0; x < items.length; x++) {
  //         var item = items[x];
  //         //get spotify id for following query
  //         var id = item["id"];
  //         //get playlist name
  //         var name = item["name"];
  //         //get playlist description
  //         var description = item["description"];

  //         var playlist = new Playlist(id, name, description);
  //         this.userPlaylists.push(playlist);
  //       }

  //     }
  //   )
  // }

  // getTracksFromPlaylist(playlistId: string) {
  //   this.spotifyData.getTracksFromPlaylist(playlistId).subscribe(
  //     response => {
  //     }
  //   );
  // }

  

  
}
