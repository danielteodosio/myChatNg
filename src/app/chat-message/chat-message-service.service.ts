import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable} from  'rxjs';
import {ChatMessageModel} from '../chat-message/chat-message-model';


@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  url = 'http://localhost:8080/myChat/';

  constructor(private httpClient: HttpClient) { }

  saveSendedMessage(chatMessageModel:ChatMessageModel):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<any>(this.url + "saveMessage", JSON.stringify(chatMessageModel), {headers: headers});
  }
  getSendedMessageBySenderAndReceiver(senderId:number, receiverId:number):Observable<any[]>{
    return this.httpClient.get<any>(this.url + "getMessagesBySenderAndReceiver?" + 'senderId=' + String(senderId) + '&' + 'receiverId=' + String(receiverId));
  }
  updateMessagesToReadedBySenderAndReceiver(senderId:number, receiverId:number):Observable<any>{
    return this.httpClient.get<any>(this.url + 'updateMessagesToReadedBySenderAndReceiver?' + 'senderId=' + senderId + '&' + 'receiverId=' + receiverId);
  }
  getSenderNotReadedMessages(senderId:number, receiverId:number):Observable<any>{
    return this.httpClient.get<any>(this.url + 'getSenderNotReadedMessages?' + 'senderId=' + senderId + '&' + 'receiverId=' + receiverId);
  }
}
