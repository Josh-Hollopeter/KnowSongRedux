export class User {
  public userId: number;
  public username: string;
  public password: string;
  public authToken :string;
  // public rank : Rank;

  constructor(userId?: number, username?: string, password?: string,authToken?:string){
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.authToken= authToken;
  }
}
