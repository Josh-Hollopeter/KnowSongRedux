import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpRequest} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  

  constructor(
    private backend: HttpXhrBackend
    ) {}



  login(){
    const request = new HttpRequest('GET', this.baseUrl + 'oauth2/authorization/spotify');
    return this.backend.handle(request);
  }

  getUserData(): any{
    const credentials = localStorage.getItem('credentials');   
    const httpOptions = {
      headers: new HttpHeaders({
        'credentials': `${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-control-Allow-Origin': 'true'
        // 'Cookie': `${xsrf}`
      }),
      withCredentials: true
    };
   
     const request = new HttpRequest('GET', this.baseUrl + 'user', httpOptions);
     return this.backend.handle(request).pipe(       
      tap((res: any) => {
        return res;
      }),
      catchError((err: any) => {
        return throwError('Error getting user info');
      })
  );

  }

  getAccessToken(){
    const credentials = localStorage.getItem('credentials');   
    const httpOptions = {
      headers: new HttpHeaders({
        'credentials': `${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
   
     const request = new HttpRequest('GET', this.baseUrl + 'getAccessToken', httpOptions);
     return this.backend.handle(request).pipe(       
      tap((res: any) => {
        return res;
      }),
      catchError((err: any) => {
        return throwError('Error getting user info');
      })
  );
  }


}
