import { UserService } from './../../models/user.service';
import { NavbarComponent } from './../navbar/navbar.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  user = new User();
  allUsers : any;

  public isAdmin: boolean;

  loggedUser:User;

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
      yes=>{
        console.log(yes);
        this.user.authToken = yes["authToken"];
        this.user.rankImg = yes["rank"].imgSource;
        this.user.username = yes["username"];
        this.user.imgSource = yes["imgSource"];
        this.user.enabled = yes["enabled"];
        this.user.role = yes["role"];
        if(this.user.role === "admin"){
          this.isAdmin = true;
        }
        this.user.gameHistories=yes["gameHistories"];
        this.usersvc.setUser(this.user);
        console.log(this.user.gameHistories);
      },
      no=>{
        console.error("in user home init")
        console.error(no);
      }
    )

  }
  createGame(){
    this.route.navigateByUrl('createGame');
  }
  setUsername(username:string){
    this.user.username = username;
  }
  matchHistory(){
    this.route.navigateByUrl('history');
  }
  getAllUsers(){
    this.usersvc.getAll().subscribe(
      yes=>{
        this.allUsers = yes;
        console.log(yes);
      },
      no=>{
        console.log(no);
      }
    );
  }
  deactivateUser(username : string){
    this.usersvc.deleteUser(username).subscribe(
      yes=>{
        this.getAllUsers();
        console.log(yes);
      },
      no=>{
        console.log(no);
        console.log("InDeactivateUser");
      }
    );
  }


  updateUser(){
    this.usersvc.updateUser(this.user).subscribe(
      yes=>{
        // this.getAllUsers();
        console.log(yes);

      },
      no=>{
        console.log(no);
        console.log("InUpdateUser");
      }
    );
  }

  adminUpdateUser(username : string, imgSource : string){
    this.usersvc.adminUpdateUser(username, imgSource).subscribe(
      yes=>{
        // this.getAllUsers();
        console.log(yes);

      },
      no=>{
        console.log(no);
        console.log("InUpdateUser");
      }
    );
  }
}
