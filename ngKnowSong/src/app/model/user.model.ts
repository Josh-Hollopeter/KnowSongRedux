import { GameHistory } from './game-history.model';

export class User {
    public username: string;
    public imgSource : string;
    // public enabled : boolean;
    // public role : string;
    public gameHistories: GameHistory[];  
  
    constructor(username?: string, imgSource?: string, gameHistories?:[]){
      this.username = username;
      this.imgSource = imgSource;
      // this.enabled = enabled;
      // this.role = role;
      this.gameHistories = gameHistories;
    }
}
