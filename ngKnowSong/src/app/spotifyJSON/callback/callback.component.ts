import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private code: string;
  private state: string;
  private user: User;

  constructor(
    private urlRouter: ActivatedRoute,
    private route: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {

    //get credentials from URL Parameters
    console.log("incllback");
    this.urlRouter.queryParams.subscribe(params => {
      this.code = params['code'];
      this.state = params['state'];
      console.log(params);
    })
    this.authorizeUser();
  }

  authorizeUser() {
    this.auth.authorizeUser(this.code, this.state).subscribe(
      good => {
        console.log(good)
        setTimeout(this.goHome,1000);

      },
      err => {
        console.log(err);
      }
    );
  }

  goHome(){
    this.route.navigateByUrl('#home')
  }
}
