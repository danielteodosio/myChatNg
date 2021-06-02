import { Component,Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {UsersBoxComponent} from '../users-box/users-box.component';
import {ChatBoxComponent} from '../chat-box/chat-box.component';
import {User} from '../login-page/login-page-model';
import {ChatPageService} from './chat-page-service.service';
import {ChatMessageModel} from '../chat-message/chat-message-model';
import {Message} from '@stomp/stompjs';
import {RxStomp} from '@stomp/rx-stomp';
import { Subscription } from 'rxjs';
import { ChatUserModel } from '../chat-user/chat-user-model';
import {ChatMessageService} from '../chat-message/chat-message-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {


  @ViewChild(UsersBoxComponent) usersBox:UsersBoxComponent;
  @ViewChild(ChatBoxComponent) chatBox:ChatBoxComponent;
  chatUser:User = new User();
  userContactId:number;
  chatUsersList:ChatUserModel[] = Array<ChatUserModel>();
  chatMessageList:ChatMessageModel[] = Array<ChatMessageModel>();
  URL_BROKER_ROOT_PUB:string = '/app/test';
  URL_BROKER_ROOT_SUB:string = '/topic/test';

  topicSubscription: Subscription;
  rxStomp = new RxStomp();

  configStandard:any = {
           brokerURL: 'ws://localhost:8080/mychat',
           connectHeaders: {
           login: 'guest',
           passcode: 'guest'
            },
           heartbeatIncoming: 0,
           heartbeatOutgoing: 20000,
           reconnectDelay: 200,
           debug: (msg: string): void => {
           console.log(new Date(), msg);
           }
        }


  constructor(private router:Router, private chatPageService:ChatPageService, private chatMessageService:ChatMessageService) {

  }

  ngOnInit(): void {
    let userEmail:string = localStorage.getItem('userEmail');
    let userPass:string = localStorage.getItem('userPass');
    this.chatPageService.getUserByEmailAndPass(userEmail, userPass).subscribe((res:User)=>{
      this.chatUser = res;
      console.log("chat user on chatpage");
      console.log(this.chatUser);
      this.rxStomp.configure(this.configStandard);
      this.rxStomp.activate();
      this.topicSubscription = this.rxStomp
      .watch(this.mountUrlBrokerToSub(this.URL_BROKER_ROOT_SUB, this.chatUser.id.toString()))
      .subscribe((message: any) => {
          console.log(message);
          console.log(this.convertUint8ArrayToString(message._binaryBody));

          let senderId:number = parseInt(this.convertUint8ArrayToString(message._binaryBody));
          if(!!this.userContactId && this.userContactId == senderId){
            this.chatMessageList = [];
            this.chatMessageService.getSendedMessageBySenderAndReceiver(senderId, this.chatUser.id).subscribe((messages:any[])=>{
              messages.forEach((message:any)=>{
                //if(!!this.userContactId && (this.userContactId == message.userSendedMessage.id || this.userContactId == message.userContactSendedMessage.id)){
                  console.log(message);
                  let chatMessage:ChatMessageModel = new ChatMessageModel();
                  chatMessage.userSender = message.userSendedMessage.name;
                  chatMessage.messageText = message.sendedMessageText;
                  chatMessage.sendDate = message.sendedMessageDate;
                  chatMessage.messageId = message.id;
                  this.chatMessageList.push(chatMessage);
                //}
              });
            });
          }else{
            this.updateContactNumberOfNewMessages(senderId,this.chatUser.id);
          }
      });
    });
    this.chatPageService.getAllUsers().subscribe((users:User[])=>{
      users.forEach((user:User)=>{
        let chatUser:ChatUserModel = new ChatUserModel();
        chatUser.id = user.id;
        chatUser.userName = user.name;
        chatUser.userConnectionStatus = true;
        chatUser.numberOfNewMessages = 0;
        this.chatUsersList.push(chatUser);
      });
      console.log("ChatUserList");
      console.log(this.chatUsersList);
    }

    );
  }

  updateContactNumberOfNewMessages(senderId:number, receiverId:number){
    this.chatMessageService.getSenderNotReadedMessages(senderId, receiverId).subscribe(number => {
      this.chatUsersList.filter(user => user.id == senderId)[0].numberOfNewMessages = number;
    });
  }

  onExit(){
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userPass", "");
    this.router.navigate(["/login"]);
  }

  userClicked(userContactIdEvent:number){
    this.chatMessageList = [];
    this.userContactId = userContactIdEvent;
    this.chatMessageService.getSendedMessageBySenderAndReceiver(userContactIdEvent, this.chatUser.id).subscribe((messages:any[])=>{
      messages.forEach((message:any)=>{
          console.log(message);
          let chatMessage:ChatMessageModel = new ChatMessageModel();
          chatMessage.userSender = message.userSendedMessage.name;
          chatMessage.messageText = message.sendedMessageText;
          chatMessage.sendDate = message.sendedMessageDate;
          chatMessage.messageId = message.id;
          this.chatMessageList.push(chatMessage);
     });
    });
    this.chatMessageService.updateMessagesToReadedBySenderAndReceiver(userContactIdEvent, this.chatUser.id).subscribe(()=>{
      this.updateContactNumberOfNewMessages(userContactIdEvent, this.chatUser.id);
    }
    );
}
  publishMessage(messageToPublish:string){
    let chatMessage:ChatMessageModel = new ChatMessageModel();
    //messageToTravel.senderName = this.chatUser.name;
    chatMessage.userSenderId = this.chatUser.id;
    chatMessage.userReceiverId = this.userContactId;
    chatMessage.messageText = messageToPublish;
    chatMessage.sendDate = new Date();
    chatMessage.userSender = this.chatUser.name;
    this.chatMessageList.push(chatMessage);
    console.log(JSON.stringify(chatMessage));
    this.rxStomp.publish({ destination: this.mountUrlBrokerToPub(this.URL_BROKER_ROOT_PUB, this.userContactId.toString()), body: JSON.stringify(chatMessage)});
  }


  //fodase o @sendtouser
  mountUrlBrokerToSub(subRootUrl:string, userId:string):string{
    return subRootUrl + '/' + userId;
  }
  mountUrlBrokerToPub(pubRootUrl:string, contactUserId:string):string{
    return pubRootUrl + '/' + contactUserId;
  }
  convertUint8ArrayToString(bodyMessage:Uint8Array):string{
    let convertedString:string = '';
    bodyMessage.forEach((uintChar)=>{
      convertedString += String.fromCharCode(uintChar);
    });
    return convertedString;
  }
}
