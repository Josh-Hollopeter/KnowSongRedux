import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { MusicDataService } from '../data/music-data.service';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';

@Injectable({
  providedIn: 'root'
})
export class LyricResolverService implements Resolve<any>{

  constructor(
    private musicDataService: MusicDataService,
    private gameBuilder: GameBuilderService,
    private router: Router
  ) { }
  
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):
  Observable<SingleplayerGame> | Promise<SingleplayerGame> | SingleplayerGame {
    
    if(this.musicDataService.getArtist() === undefined){
      this.router.navigate(['home']);
    }
    
    return this.gameBuilder.buildAudioGame(this.musicDataService.getArtist().id, 'Lyric');
    
  }
}
