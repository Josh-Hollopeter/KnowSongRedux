import { Injectable } from '@angular/core';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  public singleplayerGame: SingleplayerGame
  constructor() { }

  setGame(singleplayerGame: SingleplayerGame){
    this.singleplayerGame = singleplayerGame;
  }

  getGame(): SingleplayerGame{
    return this.singleplayerGame;
  }
}
