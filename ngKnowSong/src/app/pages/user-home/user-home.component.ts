import { UserService } from './../../models/user.service';
import { NavbarComponent } from './../navbar/navbar.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GameHistory } from 'src/app/models/game-history';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  user = new User();
  allUsers: any;

  //displaying match history
  displayedColumns = ['marks', 'numQuestions', 'datePlayed'];
  // public gameHistories: GameHistory[] = this.user.gameHistories;
  dataSource = this.user.gameHistories;
  //

  public isAdmin: boolean;
  loggedUser: User;

  constructor(
    private route: Router,
    private auth: AuthService,
    private usersvc: UserService
  ) { }

  ngOnInit(): void {

    let temp = localStorage.getItem('credentials');
    let username = atob(temp).split(":");
    console.log(username[0]);
    this.usersvc.show().subscribe(
      yes => {
        console.log(yes);
        this.user.authToken = yes["authToken"];
        this.user.rankImg = yes["rank"].imgSource;
        this.user.username = yes["username"];
        this.user.imgSource = yes["imgSource"];
        this.user.enabled = yes["enabled"];
        this.user.role = yes["role"];
        if (this.user.role === "admin") {
          this.isAdmin = true;
        }
        this.user.gameHistories = yes["gameHistories"];
        this.user.gameHistories.reverse();
        this.usersvc.setUser(this.user);

      },
      no => {
        console.error("in user home init")
        console.error(no);
      }
    )

  }
  createGame() {
    this.route.navigateByUrl('createGame');
  }
  setUsername(username: string) {
    this.user.username = username;
  }

  //form control for image update
  public imgFormToggle:boolean;
  toggleImgForm(){
    if(this.imgFormToggle == true){
      this.imgFormToggle = false;
    } else{
      this.imgFormToggle = true;
    }
  }

  //

  //-----------
  //-ADMIN TOOLS
  //-----------
  getAllUsers() {
    this.usersvc.getAll().subscribe(
      yes => {
        this.allUsers = yes;
        console.log(yes);
      },
      no => {
        console.log(no);
      }
    );
  }
  deactivateUser(username: string) {
    this.usersvc.deleteUser(username).subscribe(
      yes => {
        this.getAllUsers();
        console.log(yes);
      },
      no => {
        console.log(no);
        console.log("InDeactivateUser");
      }
    );
  }


  updateUser() {
    this.usersvc.updateUser(this.user).subscribe(
      yes => {
        // this.getAllUsers();
        console.log(yes);

      },
      no => {
        console.log(no);
        console.log("InUpdateUser");
      }
    );
  }
  dateConvert(date){
    if(date!=null){
  date =  date.replace(/T/,' Time:');
  return date;
    }
  }

  adminUpdateUser(username: string, imgSource: string) {
    this.usersvc.adminUpdateUser(username, imgSource).subscribe(
      yes => {
        // this.getAllUsers();
        console.log(yes);

      },
      no => {
        console.log(no);
        console.log("InUpdateUser");
      }
    );
  }
}
