import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { Injectable } from "@angular/core";

@Injectable()
export class GameHistory {

    public gamePlayed: boolean;

    public singleplayerGameHistory: Array<SingleplayerGame>;

    constructor() { }
  
    setSingleplayerGameHistory(singleplayerGameHistory: Array<SingleplayerGame>){
      this.singleplayerGameHistory = singleplayerGameHistory;
    }
  
    getSingleplayerGameHistory(): Array<SingleplayerGame>{
      return this.singleplayerGameHistory;
    }

    setGamePlayed(played: boolean){
      this.gamePlayed = played;
    }

    getGamePlayed(): boolean{
      return this.gamePlayed;
    }
}
