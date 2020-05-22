import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor() { }

  setUser(username: string, imgSource: string, gameHistories: []){
    this.user = new User(
      username,
      imgSource,
      gameHistories
    );
  }

  getUser(): User{
    return this.user;
  }

  removeUser(){
    this.user = null;
  }
}
