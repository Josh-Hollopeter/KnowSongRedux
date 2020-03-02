import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(
    private authService:AuthService,
    private route:Router,
    private usersvc: UserService
    ) { }

  ngOnInit(): void {

  }

  login(form: NgForm){
    this.authService.login(form.value.username, form.value.password).subscribe(
      success => {
        this.usersvc.show().subscribe(
          yes=>{
            console.log(yes);
            this.user.authToken = yes["authToken"];
            this.user.rankImg = yes["rank"].imgSource;
            this.user.username = yes["username"];
            this.user.imgSource = yes["imgSource"];
            this.user.enabled = yes["enabled"];
            this.user.role = yes["role"];
            this.usersvc.setUser(this.user);
          },
          no=>{
            console.error("in user home init")
            console.error(no);
          }
        )
        this.route.navigateByUrl('home');
      },
      fail => {
        console.error('Error logging in');
      }
    )

  }

}
