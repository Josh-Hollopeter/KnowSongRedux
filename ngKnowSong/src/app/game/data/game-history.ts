import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { Injectable } from "@angular/core";

@Injectable()
export class GameHistory {

    public singleplayerGameHistory: Array<SingleplayerGame>
    constructor() { }
  
    setSingleplayerGameHistory(singleplayerGameHistory: Array<SingleplayerGame>){
      this.singleplayerGameHistory = singleplayerGameHistory;
    }
  
    getSingleplayerGameHistory(): Array<SingleplayerGame>{
      return this.singleplayerGameHistory;
    }
}
