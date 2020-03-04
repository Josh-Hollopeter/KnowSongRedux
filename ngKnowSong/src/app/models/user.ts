import { GameHistory } from './game-history';
import { Rank } from '../spotifyJSON/models/rank.model';

export class User {
  public userId: number;
  public username: string;
  public password: string;
  public authToken :string;
  public rankImg : string;
  public imgSource : string;
  public enabled : boolean;
  public role : string;
  public gameHistory: GameHistory;
  public gameHistories: GameHistory[];




  constructor(userId?: number, username?: string, password?: string,authToken?:string, rankImg?: string, imgSource?: string, enabled?: boolean, role?: string,gameHistory?:GameHistory,gameHistories?:[]){
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.authToken= authToken;
    this.rankImg = rankImg;
    this.imgSource = imgSource;
    this.enabled = enabled;
    this.role = role;
    this.gameHistories = gameHistories;
  }
}
