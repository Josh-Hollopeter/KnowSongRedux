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
      tap((res: any) => {
        return res;
      }),
      catchError((err: any) => {
        return throwError('Error getting user info');
      })
  );

  }

  getAccessToken(){
   
     const request = new HttpRequest('GET', this.baseUrl + 'getAccessToken', this.httpOptions);

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
