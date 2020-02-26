import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8085/' + 'api/user';
  private user: User;
  // private http: HttpClient;
  constructor(private http: HttpClient) {

  }


  show() {
    // const credentials = this.authService.getCredentials()

    const options = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.get<User>(this.url, options).pipe(
      tap((res) => {
        this.setUser(res);
        return res;
      }),
      catchError((err: any) => {
        console.error('user.show() : Error retrieving user');
        console.error(err);
        return throwError(err);
      })
    );
  }

  setUser(user: User){
    this.user = user;
  }

  getUser(): User{
    return this.user;
  }

  getAll() {
    // const credentials = this.authService.getCredentials()

    const options = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.get(this.url + "s", options).pipe(


      catchError((err: any) => {
        console.error('user.getAll() : Error retrieving user');
        console.error(err);
        return throwError(err);
      })
    );
  }

}
