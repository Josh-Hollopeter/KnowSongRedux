import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  loggedUser:User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  playGame(){
    console.log("here");
  }

}
