import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, filter, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private router: Router
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
