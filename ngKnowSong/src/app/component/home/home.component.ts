import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   public username: String = new String();
   public userimg;

  constructor(
    private authService: AuthService,
    private route: Router
    ) { }

  ngOnInit(): void {
    // this.getAccessToken();
    // this.getUserDetail();
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
        // let body = JSON.stringify(res);
        // console.log(body);
        // var body = success["body"];
        // console.log(body["username"]);
        
        // this.username = body["username"];
        // this.userInfo = success;
      },
      fail => {
        // console.error(fail);
        // this.userInfo = fail;
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
      },
      () => {
        console.log("complete notification");
        
      }
    )
  }
}
