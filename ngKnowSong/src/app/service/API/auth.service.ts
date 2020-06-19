import { Injectable } from '@angular/core';
import { HttpHeaders, HttpXhrBackend, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, filter, takeWhile, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../Data/user.service';
import { User } from '../../model/user.model';

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
    console.log("CHECKING LOGIN STATUS");
    
    const request = new HttpRequest('GET', this.baseUrl + 'isLoggedIn', this.httpOptions);
    return this.backend.handle(request).pipe(     
      map( (event: HttpResponse<any>): boolean => {
        if(event.status == 200){
          console.log("success");
          
          return true;
        }
          
       }),skip(1), //skip the success packet
       catchError((err: any) => {
        this.router.navigate(['']);
        return throwError(err);
        
      })
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
          
          let newUser = new User(username, userimg);
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
          sessionStorage.setItem('access', body["tokenValue"]);
          return body["tokenValue"];
        }
      }),skip(1)
    );
  }

  refreshAccessToken(): Observable<string>{
    const request = new HttpRequest('GET', this.baseUrl + 'refreshAccessToken', this.httpOptions);

    return this.backend.handle(request).pipe(      
      map((event: HttpResponse<any>)=> {
        if(event.status == 200){
          let body = event["body"];
          let tokenValue: string = body["tokenValue"];
          if(sessionStorage.getItem('access') != null)
            sessionStorage.removeItem('access');
          sessionStorage.setItem('access', tokenValue);
          
          return tokenValue;
        }
      }),skip(1)
    );
  }

}
