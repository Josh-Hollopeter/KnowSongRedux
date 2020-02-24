import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private code: string;
  private state: string;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private auth: AuthService,
    private user: User
  ) {
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.state = params['state'];
    })
    console.log(this.user.username);

    this.auth.authorizeUser(this.code, this.state, this.user.username).subscribe(
      good => console.log(good),
      err => console.log(err)
    );

  }

}
