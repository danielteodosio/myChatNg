import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {User} from '../login-page/login-page-model';

@Injectable({
  providedIn: 'root'
})
export class ChatPageService {
  url = 'http://localhost:8080/myChat/';
  constructor(private httpClient:HttpClient) { }

  getUserByEmailAndPass(email:string, pass:string):Observable<any>{
    return this.httpClient.get<any>(this.url + 'getUserByNameAndPass?' + 'userEmail=' + email + '&' + 'userPass=' + pass);
  }
  getAllUsers():Observable<any>{
    return this.httpClient.get<any>(this.url + 'getAllUsers');
  }
}
