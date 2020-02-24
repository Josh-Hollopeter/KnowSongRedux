import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public onIndex: boolean;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.onIndex = true;
  }

  login(): void{
    this.route.navigateByUrl('login');
  }
  register(): void{
    this.route.navigateByUrl('register');
  }


}
