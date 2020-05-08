import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { HttpClient } from '@angular/common/http';

// landing page where users can login through spotify
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  user: User = new User();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  requestAuth(){
    window.open('http://localhost:8085/oauth2/authorization/spotify');
  }
  login(){
    console.log("logging in and stuff");
    this.authService.login().subscribe(
      success=> {
        console.log(success);
        this.user.username = success["spotifyId"];
        // this.user.imgSource = success["spotifyImg"];
        // this.user.role = success["role"];
        // this.user.accessToken = success["accessToken"];//i think we put this on header
        // this.user.enabled = success["enabled"];
      },
      failure => {
        console.log("user login failed in landing component");
        console.log(failure);
      }
    )
    // window.location.href = 'http://localhost:8085/'
  }
}
