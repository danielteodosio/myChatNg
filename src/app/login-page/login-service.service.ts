import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {User} from './login-page-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:8080/myChat/';

  constructor(private httpClient: HttpClient) { }

  submitLogin(email:string, pass:string): Observable<any>{
    return this.httpClient.get<any>(this.url + 'checkIfemailAndPassMatch?' + 'email=' + email + '&' + 'pass=' + pass);
  }
  
  submitSigninData(user:User): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<any>(this.url + "saveUser", JSON.stringify(user), {headers: headers});
  }
}
