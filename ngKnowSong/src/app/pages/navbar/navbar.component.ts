import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return this.auth.checkLogin();
  }
  logout() {
    this.auth.logout();
    this.route.navigateByUrl('index');
  }

  userHome(){
    this.route.navigateByUrl('home');
  }


}
