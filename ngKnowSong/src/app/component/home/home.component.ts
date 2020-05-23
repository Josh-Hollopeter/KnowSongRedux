import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.loadUser();

  }

  private loadUser(){
    
    if(this.userService.getUser() === undefined){
      console.log("hello?");
      this.user = this.authService.getUserData().subscribe();
      this.user = this.authService.getUserData().pipe(map((response: User) => {
        return response;
      }));
      this.authService.getAccessToken().subscribe();

    } else{
      this.user = this.userService.getUser();  
    }
  }
  
}
