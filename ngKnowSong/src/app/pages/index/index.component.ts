import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if(this.auth.checkLogin){
      this.route.navigateByUrl('home');
    }
  }

  login(): void{
    this.route.navigateByUrl('login');
  }
  register(): void{
    this.route.navigateByUrl('register');
  }


}
