import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/API/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/Data/user.service';
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
    private route: Router,
    private activatedRoute: ActivatedRoute
    ) {  }

  ngOnInit(): void {
    // using activated route and a resolver, the user data is loaded before page is viewed
    // this will be handy when retrieving user data from server after games are played..
    this.activatedRoute.data.subscribe((data: { user: User}) => {
      this.user = data.user;
    })
  }
  
}
