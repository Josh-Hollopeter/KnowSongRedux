import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models/user';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8085/';

  constructor( private http: HttpClient ) { }

  login(username, password) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    console.log(credentials);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    // create request to authenticate credentials
    return this.http
      .get(this.baseUrl + 'authenticate', httpOptions)
      .pipe(
        tap((res) => {
          localStorage.setItem('credentials' , credentials);
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('AuthService.login(): Error logging in.');
        })
      );
  }

  register(user: User){
    return this.http.post(this.baseUrl + 'register', user)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): Error registering user.');
      })
    );
  }

  requestAuthorization() {
    var credentials = localStorage.getItem('credentials');
    let state = this.generateStateString(16);
    console.log("State: " + state);
    console.log("credentials: " + credentials);

    const headers = new HttpHeaders().set('Authorization', `Basic ${credentials}`);
    headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.post(this.baseUrl + 'getAuthorized', state, {headers, responseType:'text'}).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.requestAuthorization(): Error getting redirect uri.');
      })
    );
  }
  //   return this.http.get(this.baseUrl + 'getAuthorized', {responseType: 'text'}).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError('AuthService.requestAuthorization(): Error getting redirect uri.');
  //     })
  //   );
  // }

  // generate random string of characters
  // prevents against cross-site request forgery
  generateStateString(length: number): string{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var x = 0; x < length; x++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  //verify that state string is the same, then send code to server to retrieve OAuth2 token.

  authorizeUser(code: string, state: string){
    console.log("HELLO FROM AUTHorize");

  //pack up our data into a comma sepearated string
    let packet = code + "," + state;
    //generate header
    var credentials = localStorage.getItem('credentials');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'text/plain; charset=utf-8'
      })
    };

    return this.http.post(this.baseUrl + 'authorizeUser', packet, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.requestAuthorization(): Error getting tokens :(');
      })
    );
  }
  // small boys

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  generateBasicAuthCredentials(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  logout() {
    localStorage.removeItem('credentials');
  }

}
