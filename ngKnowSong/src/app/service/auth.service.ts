import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, filter, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private credentials: String;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(
    private backend: HttpXhrBackend,
    private router: Router,
    private userService: UserService
    ) {}



  login(){
    const request = new HttpRequest('GET', this.baseUrl + 'oauth2/authorization/spotify');
    return this.backend.handle(request);
  }
  
  isLoggedIn(): any{
    const request = new HttpRequest('GET', this.baseUrl + 'isLoggedIn', this.httpOptions);
    return this.backend.handle(request).pipe(     
      map((event: HttpResponse<any>)=> {
        if(event.body == true){
          sessionStorage.setItem("logged in", "Rock on dude! You are now free to move about the app!");
          this.router.navigate(['home']);
          return true;
        }
        else if(event.body == false){
          this.router.navigate(['login']);  //just sends them to login/landing page but with a helpful URI
          return false;
        }
       })
    );

  }

  getUserData(): any{ 
    const request = new HttpRequest('GET', this.baseUrl + 'user', this.httpOptions);

    return this.backend.handle(request).pipe(     
      map((event: HttpResponse<any>)=> {
        if(event.status == 200){
          let body = event["body"];
          let username = body["username"];
          let userimg = body["imgSource"];
          let gameHistories:[] = body["gameHistories"];

          this.userService.setUser(username, userimg, gameHistories);
        }
        return event;
       }),
      // map(res => {return res;}),
      catchError((err: any) => {
        return throwError('Error getting user info');
      })
    );

  }

  getAccessToken(){
    const request = new HttpRequest('GET', this.baseUrl + 'getAccessToken', this.httpOptions);

    return this.backend.handle(request).pipe(      
      map((event: HttpResponse<any>)=> {
        // checks status to avoid picking up the {type: 0} .Sent response
        if(event.status == 200){
          let body = event["body"];
          let expiration: number = body["expiresAt"];
          if(expiration < 240){
            // we only got 4 minutes to save the world -JT... https://www.youtube.com/watch?v=aAQZPBwz2CI

          }
          localStorage.setItem('access', body["tokenValue"]);
        }
          console.log(event);
          return event; 
      }),
      catchError((err: any) => {
        return throwError('Error getting access token');
      })
    );
  }

  refreshAccessToken(){
    const request = new HttpRequest('GET', this.baseUrl + 'refreshAccessToken', this.httpOptions);

    return this.backend.handle(request).pipe(      
      map((event: HttpResponse<any>)=> {
        if(event.status == 200){
          let body = event["body"];
          localStorage.removeItem('access');
          localStorage.setItem('access', body["tokenValue"]);
        }
      }),
      catchError((err: any) => {
        return throwError('Error refreshing access token');
      })
    );
  }

}
