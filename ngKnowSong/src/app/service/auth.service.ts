import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  

  constructor(
    private http: HttpClient
    ) {}



  login(){
    return this.http.get(this.baseUrl + 'oauth2/authorization/spotify',)
  }

  getUserData(): any{
    const credentials = localStorage.getItem('credentials');
    const httpOptions = {
      headers: new HttpHeaders({
        'credentials': `${credentials}`,
        'Content-Type': 'text/plain; charset=utf-8'
      })
    };
   
     console.log(credentials);

     return this.http.get(this.baseUrl + 'user', httpOptions).pipe(       
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting user info');
      })
  );

  }

getCredentials() {
  return localStorage.getItem('credentials');
}

}
