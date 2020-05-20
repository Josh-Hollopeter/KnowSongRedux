import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, filter, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private credentials: String;

  private httpOptions = {
    headers: new HttpHeaders({
      'credentials': `${this.credentials}`,
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(
    private backend: HttpXhrBackend
    ) {
      this.credentials = localStorage.getItem('credentials'); 
    }



  login(){
    const request = new HttpRequest('GET', this.baseUrl + 'oauth2/authorization/spotify');
    return this.backend.handle(request);
  }

  getUserData(): any{
      
     const request = new HttpRequest('GET', this.baseUrl + 'user', this.httpOptions);

     return this.backend.handle(request).pipe(     
       map((event: HttpResponse<any>)=> {
         return event;
       })  ,
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


}
