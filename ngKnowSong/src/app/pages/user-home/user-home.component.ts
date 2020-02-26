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

        this.user.userImg = yes["imgSource"];
        this.user.enabled = yes["enabled"];
        this.user.role = yes["role"];
        console.log("User role: " + this.user.role);


        console.log(this.user);
        this.usersvc.setUser(this.user);

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


}
