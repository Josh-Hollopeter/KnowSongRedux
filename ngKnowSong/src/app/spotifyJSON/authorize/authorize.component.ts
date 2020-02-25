import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // AuthorizeComponent.
    // window.opener && window.opener.postMessage(JSON.stringify({
    //   type:'access_token',
    //   access_token: '<%= access_token %>',
    //   expires_in: '<%= expires_in %>',
    //   refresh_token: '<%= refresh_token %>'
    // }), '*');

    // window.close();
  }
  authorize(){

    console.log("authorizing");
    this.auth.requestAuthorization().subscribe(
      data => {
        window.location.href = String (data);
      }
    );
  }

}
