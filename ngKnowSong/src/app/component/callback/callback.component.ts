import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.getUserData().subscribe();
    this.authService.getAccessToken().subscribe();
    this.router.navigate(['home']);
  }

}
