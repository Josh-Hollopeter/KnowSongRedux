import { GameHistory } from './game-history.model';

export class User {
    public userId: number;
    public username: string;
    public accessToken :string;
    public imgSource : string;
    public enabled : boolean;
    public role : string;
    public gameHistories: GameHistory[];  
  
    constructor(userId?: number, username?: string, imgSource?: string, enabled?: boolean, role?: string, gameHistories?:[]){
      this.userId = userId;
      this.username = username;
      this.imgSource = imgSource;
      this.enabled = enabled;
      this.role = role;
      this.gameHistories = gameHistories;
    }
}
