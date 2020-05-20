import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   public username: String;
   public userimg: String;

  constructor(
    private authService: AuthService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.getAccessToken();
    this.getUserDetail();
  }

  getUserDetail(){
    this.authService.getUserData().subscribe(
      res => {
        if(res.status == 200){
          console.log(res);
          
          let body = res["body"];
          this.username = body["username"];
          this.userimg = body["imgSource"];
        }
      },
      fail => {
        console.error(fail);

      }
    )
  }
  getAccessToken(){
    this.authService.getAccessToken().subscribe(
      res => {
        // checks status to avoid picking up the {type: 0} .Sent response
        if(res.status == 200){
          let body = res["body"];
          let expiration = body["expiresAt"];
          localStorage.setItem('access', body["tokenValue"]);
        }
      },
      fail => {
        console.error(fail);
        // this.userInfo = fail;
      }
    )
  }
  refreshAccessToken(){
    this.authService.refreshAccessToken().subscribe(
      res => {
        console.log(res);
        
      }
    )
  }
}
