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
    // let temp = localStorage.getItem('credentials');
    // let username = atob(temp).split(":");

    // console.log(username[0]);
    this.usersvc.show().subscribe(
      yes=>{
        console.log(yes);
        this.user.authToken = yes["authToken"];
        // this.user.rank
        this.user.username = yes["username"];
        console.log(this.user);
      },
      no=>{
        console.error("in user home init")
        console.error(no);
      }
    )

  }
  createGame(){
    this.route.navigateByUrl('game');
  }
  setUsername(username:string){
    this.user.username = username;
  }

}
