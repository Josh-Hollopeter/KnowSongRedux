import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthorizeComponent } from '../authorize/authorize.component';
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
    private auth: AuthService
  ) {
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.state = params['state'];
    })

    this.auth.authorizeUser(this.code, this.state).subscribe(
      good => console.log(good),
      err => console.log(err)
    );

  }

}
