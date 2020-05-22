import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe();
    // if not redirected by above^
    this.authService.getUserData().subscribe();
    this.authService.getAccessToken().subscribe();
  }

  getUserDetail(){
    this.authService.getUserData().subscribe(
      res => {
        if(res.status == 200){
          let body = res["body"];
          let username = body["username"];
          let userimg = body["imgSource"];
          let gameHistories:[] = body["gameHistories"];

          this.userService.setUser(username, userimg, gameHistories);
        }
      },
      fail => {
        console.error(fail);
      }
    )
  }

  getAccessToken(){
    this.authService.getAccessToken().subscribe();
  }

}
