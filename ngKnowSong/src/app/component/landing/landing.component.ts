import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
// landing page where users can login through spotify

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log("logging in and stuff");
    // window.location.href = 'http://localhost:8085/'
  }
}
