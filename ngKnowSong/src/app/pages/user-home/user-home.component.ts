import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  loggedUser:User;

  constructor(
    private route: Router,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
  }

  authorize(){
    console.log("authorizing");

    this.auth.requestAuthorization().subscribe(
      data => {
        window.location.href = data;
      }
    );
  }

}
