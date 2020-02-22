export class User {
  public email: string;
  public username: string;
  public password: string;

  constructor(email: string, username: string, password: string){
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
