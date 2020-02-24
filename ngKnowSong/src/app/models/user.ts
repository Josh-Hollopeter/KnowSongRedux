export class User {
  public userId: number;
  public username: string;
  public password: string;
  // public rank : Rank;

  constructor(userId?: number, username?: string, password?: string){
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
