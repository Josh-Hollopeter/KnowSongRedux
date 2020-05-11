import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public userInfo: String = new String();

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  getUserDetail(){
    this.authService.getUserData().subscribe(
      success => {
        console.log(success);
        // this.userInfo = success;
      },
      fail => {
        console.error(fail);
        // this.userInfo = fail;
      }
    )
  }
  getAccessToken(){
    this.authService.getAccessToken().subscribe(
      success => {
        console.log(success);
        // this.userInfo = success;
      },
      fail => {
        console.error(fail);
        // this.userInfo = fail;
      }
    )
  }
}
