import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';

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
