import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { SpotifyAPIService } from 'src/app/service/API/spotify-api.service';
import { MusicDataService } from '../data/music-data.service';
import { Observable, concat, Subject, empty, ReplaySubject } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';

@Injectable({
  providedIn: 'root'
})
export class AudioResolverService implements Resolve<SingleplayerGame>{

  constructor(
    private musicDataService: MusicDataService,
    private gameBuilder: GameBuilderService,
    private router: Router
  ) {

  }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):
  Observable<SingleplayerGame> | Promise<SingleplayerGame> | SingleplayerGame {
    
    if(this.musicDataService.getArtist() === undefined){
      this.router.navigate(['home']);
    }
    
    return this.gameBuilder.buildAudioGame(this.musicDataService.getArtist().id, 'Audio');
    
  }

}
