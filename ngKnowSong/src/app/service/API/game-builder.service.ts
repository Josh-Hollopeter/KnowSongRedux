import { Injectable } from '@angular/core';
import { HttpHeaders, HttpXhrBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { map, catchError } from 'rxjs/operators';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { GameServiceService } from '../../game/data/game-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {

  private baseUrl = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(
    private backend: HttpXhrBackend,
    private gameStorage: GameServiceService,
    private router: Router,
  ) { }


  buildAudioGame(artistId: string): Observable<SingleplayerGame>{
    const request = new HttpRequest('GET', this.baseUrl + 'spotifyData/buildArtistAudioGame/' + artistId + '/' + sessionStorage.getItem('access'), this.httpOptions);
    return this.backend.handle(request).pipe(
      map((event: HttpResponse<any>): SingleplayerGame =>{
        if(event.status == 200){
          let body = event.body;
          let description: string = body.description;
          let questions: Array<SingleplayerQuestion> = body.questions;

          let game: SingleplayerGame = new SingleplayerGame(description, questions);
          this.gameStorage.setGame(game);
          return game;
        } else if(event.status == 401){
          console.log("Unauthorized user");
          return null;
        } else if(event.status == 404){
          console.log("Game not built");
          return null;
        }
      }),
      catchError((err: any) => {
        this.router.navigate(['']);
        return throwError(err);
      }
    ));
  }

  storeGame(game: SingleplayerGame){
    console.log("persisting game");
    const request = new HttpRequest('POST', this.baseUrl + 'spotifyData/storeSingleplayerGame',game, this.httpOptions );
    
    return this.backend.handle(request).pipe(
      map((event: HttpResponse<any>): boolean =>{
        console.log(event);
        
        if(event.status == 200){
          return true;
        } else if(event.status == 401){
          console.log("Unauthorized user");
          return false;
        } else if(event.status == 404){
          console.log("Game not built");
          return false;
        }
      }),
      catchError((err: any) => {
        this.router.navigate(['']);
        return throwError(err);
      }
    ));
  }
}
