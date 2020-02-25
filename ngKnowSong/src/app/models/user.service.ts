import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8085/' + 'api/user';
  // private http: HttpClient;
  constructor(private http: HttpClient) {

 }


show(){
  // const credentials = this.authService.getCredentials()

  const options = {
    headers: {


      'Content-type': 'application/json'
    }
  };
  return this.http.get(this.url,options).pipe(
    catchError((err: any) => {
      console.error('user.show() : Error retrieving user');
      console.error(err);
      return throwError(err);
    })
  );
}
}
