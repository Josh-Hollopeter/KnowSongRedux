import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private newUser: User

  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    //check to make sure the password is correct
    // if(form.value.password === form.value.verifyPassword){

    // }
    // else{

    // }

    this.newUser = new User();
    this.newUser.password = form.value.password;
    this.newUser.username = form.value.username;

    this.auth.register(this.newUser).subscribe(
      data => {
        console.log('RegisterComponent.register(): user registered.');
        this.auth.login(this.newUser.username, this.newUser.password).subscribe(
          next => {
            console.log('Login component: user logged in, routing to home page');
            this.route.navigateByUrl('home');
          }
        )
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
      }
    );
  }

}
