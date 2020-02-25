import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(
    private authService:AuthService,
    private route:Router
    ) { }

  ngOnInit(): void {

  }

  login(form: NgForm){
    this.authService.login(form.value.username, form.value.password).subscribe(
      success => {
        console.log(this.user.userId);
        this.route.navigateByUrl('home');
      },
      fail => {
        console.error('Error logging in');
      }
    )

  }

}
