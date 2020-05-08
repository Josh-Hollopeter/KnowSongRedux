import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private http: HttpClient;

  constructor() {}


// |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// |~~~~~~~~~~~~~~~~~~~~~~~~ OAuth2 Authorization ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  login(){
    return this.http.get(this.baseUrl + 'oauth2/authorization/spotify',)
  }

  /********************************************************************************
  * Request Authorization:
  * - Get redirect URI from Spring Servlet Controller 
  ********************************************************************************/
 requestAuthorization() {
  var credentials = this.getCredentials;
  let state = this.generateStateString(16);

  const headers = new HttpHeaders();
  headers.set('Authorization', `Basic ${credentials}`);
  headers.set('Content-Type', 'text/plain; charset=utf-8');

  return this.http
  .post(this.baseUrl + 'getAuthorized', state, {headers, responseType:'text'})
  .pipe(
    catchError((err: any) => {
      return throwError('AuthService.requestAuthorization(): Error getting redirect uri.');
    })
  );
}

/********************************************************************************
* GenerateStateString:
* - What: generate random string of characters
* - Why: prevents against cross-site request forgery
********************************************************************************/
generateStateString(length: number): string{
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( let x = 0; x < length; x++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/********************************************************************************
* Authorize User:
* - 1st) verify that state string is the identical 
* - 2nd) send OAuth2 API Server code to our internal endpoint to retrieve OAuth2 Access Token
********************************************************************************/
authorizeUser(code: string, state: string){
  
  let packet = code + "," + state;
  
  var credentials = this.getCredentials; 
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'text/plain; charset=utf-8'
    })
  };

  //send packet to Spring Controller
  return this.http.post(this.baseUrl + 'authorizeUser', packet, httpOptions).pipe(
    catchError((err: any) => {
      return throwError('AuthService.authorizeUser(): Error getting access token :(');
    })
  );
}

getCredentials() {
  return localStorage.getItem('credentials');
}

}
