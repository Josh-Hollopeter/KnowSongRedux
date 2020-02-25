import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn:boolean;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.auth.checkLogin()
  }

  isLoggedIn(): boolean{
    return this.auth.checkLogin();
  }
  logout(){
    this.auth.logout();
    this.loggedIn = false;
  }
  public setLoggedIn(status){
  this.loggedIn = status
  }


}
