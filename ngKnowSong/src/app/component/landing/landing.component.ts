import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// landing page where users can login through spotify
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  user: User = new User();

  private baseUrl = environment.baseUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { 
    // check if user is authenticated with spotify by cookie in storage or somethign



  }

  ngOnInit(): void {
  }

  // this function authenticates the client with the server and registers the user into database
  requestAuth(){
    window.location.replace(this.baseUrl +'oauth2/authorization/spotify');
    // are my commits working
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
