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




  constructor(userId?: number, username?: string, password?: string,authToken?:string, rankImg?: string, imgSource?: string, enabled?: boolean, role?: string){
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.authToken= authToken;
    this.rankImg = rankImg;
    this.imgSource = imgSource;
    this.enabled = enabled;
    this.role = role;
  }
}
