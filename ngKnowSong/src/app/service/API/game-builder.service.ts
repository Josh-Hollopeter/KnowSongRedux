import { Injectable } from '@angular/core';
import { HttpHeaders, HttpXhrBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { map, catchError, skip } from 'rxjs/operators';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { GameServiceService } from '../../game/data/game-service.service';
import { Router } from '@angular/router';
import { GameHistory } from 'src/app/game/data/game-history';

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
    private gameListStorage: GameHistory,
    private router: Router,
  ) { }


  buildAudioGame(artistId: string, gameType: string): Observable<SingleplayerGame>{
    const request = new HttpRequest('GET', this.baseUrl + 'spotifyData/buildArtistAudioGame/' + artistId + '/' + gameType + '/'+ sessionStorage.getItem('access'), this.httpOptions);
    return this.backend.handle(request).pipe(
      map((event: HttpResponse<any>): SingleplayerGame =>{
        if(event.status == 200){
          let body = event.body;
          let artist: string = body.artist;
          let gameType: string = body.gameType;
          let questions: Array<SingleplayerQuestion> = body.questions;

          let game: SingleplayerGame = new SingleplayerGame(artist, gameType, questions);
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
    const request = new HttpRequest('POST', this.baseUrl + 'spotifyData/storeSingleplayerGame', game, this.httpOptions );
    
    return this.backend.handle(request).pipe(
      map((event: HttpResponse<any>): boolean =>{
        if(event.status == 200){
          return true;
        } else if(event.status == 401){
          console.log("Unauthorized user");
          return false;
        } else if(event.status == 404){
          console.log("Game not stored");
          return false;
        }
      }),
      catchError((err: any) => {
        this.router.navigate(['']);
        return throwError(err);
      }
    ));
  }

  getSingleplayerGames(): Observable<SingleplayerGame[]>{
    const request = new HttpRequest('GET', this.baseUrl + 'spotifyData/getSingleplayerGames', this.httpOptions );
    
    return this.backend.handle(request).pipe(
      map((event: HttpResponse<any>): SingleplayerGame[] =>{
        if(event.status == 200){
          let body = event["body"];
          let gameList: SingleplayerGame[] = new Array<SingleplayerGame>();
          
          // parse all games recorded under user
          for(let i = 0; i < body.length; i++){
            let game: SingleplayerGame = new SingleplayerGame();
            game.artist = body[i]["artist"];
            game.gameType = body[i]["gameType"];
            game.id = body[i]["id"]["id"];
  
            // date does not work for mobile browsers!!!
            game.played =  new Date(body[i]["played"]).toLocaleString();
            
            game.questions = body[i]["questions"];
            gameList.push(game);                 
          }
          this.gameListStorage.setSingleplayerGameHistory(gameList);
          return gameList;
          
        } else if(event.status == 401){
          console.log("Unauthorized user");
          return null;
        } else if(event.status == 404){
          console.log("Game not built");
          return null;
        }
      }),skip(1),
      catchError((err: any) => {
        this.router.navigate(['']);
        return throwError(err);
      }
    ));
  }
}
