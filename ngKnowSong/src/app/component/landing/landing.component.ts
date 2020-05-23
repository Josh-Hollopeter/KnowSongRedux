import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  private baseUrl = environment.baseUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    ViewEncapsulation.ShadowDom;

  }

  // this function authenticates the client with the server and registers the user into database
  requestAuth(){
    window.location.replace(this.baseUrl +'oauth2/authorization/spotify');
  }
}
