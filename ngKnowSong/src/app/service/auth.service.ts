import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, filter, takeWhile, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../model/user.model';

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

  
  isLoggedIn(): Observable<boolean>{
    const request = new HttpRequest('GET', this.baseUrl + 'isLoggedIn', this.httpOptions);
    return this.backend.handle(request).pipe(     
      map((event: HttpResponse<any>): boolean => {
        if(event.body == true)
          return true;
        else if(event.body == false)
          return false;
       }),skip(1) //skip the success packet
    );

  }

  getUserData(): Observable<User>{ 
    const request = new HttpRequest('GET', this.baseUrl + 'user', this.httpOptions);

    return this.backend.handle(request).pipe(     
      map((event: HttpResponse<any>) => {
        
        if(event.status == 200){
          let body = event["body"];
          let username = body["username"];
          let userimg = body["imgSource"];
          let gameHistories:[] = body["gameHistories"];
          
          let newUser = new User(username, userimg, gameHistories);
          this.userService.setUser(newUser);
          
          return newUser;
        }
       }),skip(1), //skip the success packet
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
          localStorage.setItem('access', body["tokenValue"]);
        }
      }),skip(1)
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
