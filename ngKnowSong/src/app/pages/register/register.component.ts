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
  userExists: any;

  constructor(
    private route: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }


  register(form: NgForm) {
    // verify password
    if(!(form.value.password === form.value.verifyPassword)){
      window.alert("Password did not match.");

    }


    this.newUser = new User();
    this.newUser.password = form.value.password;
    this.newUser.username = form.value.username;

    this.auth.register(this.newUser).subscribe(
      data => {
        console.log('RegisterComponent.register(): user registered.');  //auto login
        this.auth.login(this.newUser.username, this.newUser.password).subscribe(
          next => {
            this.auth.requestAuthorization().subscribe(
              redirectUri => {
                window.location.href = String (redirectUri);  //redirect user to spotify authorization
              }
            )
          }
        )
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
        this.userExists = "exists";
      }
    );
  }

}
