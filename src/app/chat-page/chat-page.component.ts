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
import {MessageTravelModel} from '../chat-message/chat-message-model';
import {ChatMessageService} from '../chat-message/chat-message-service.service';

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


  constructor(private chatPageService:ChatPageService, private chatMessageService:ChatMessageService) { 

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
        
        let messageToTravel:MessageTravelModel = JSON.parse(this.convertUint8ArrayToString(message._binaryBody));
        console.log(messageToTravel);

        let chatMessage:ChatMessageModel = new ChatMessageModel();
        chatMessage.messageText = messageToTravel.bodyMessage;
        chatMessage.userSender = messageToTravel.senderName;
        chatMessage.sendDate = new Date();
        chatMessage.userSenderId = messageToTravel.senderId;
        chatMessage.userReceiverId = this.chatUser.id;
        //this.chatMessageList.push(chatMessage);
        this.chatMessageService.saveSendedMessage(chatMessage).subscribe((result:any)=>{
          this.chatMessageList = [];
          this.chatMessageService.getSendedMessageBySenderAndReceiver(chatMessage.userSenderId, this.chatUser.id).subscribe((messages:any[])=>{
            messages.forEach((message:any)=>{
              if(!!this.userContactId && (this.userContactId == message.userSendedMessage.id || this.userContactId == message.userContactSendedMessage.id)){
                console.log(message);
                let chatMessage:ChatMessageModel = new ChatMessageModel();
                chatMessage.userSender = message.userSendedMessage.name;
                chatMessage.messageText = message.sendedMessageText;
                chatMessage.sendDate = message.sendedMessageDate;
                this.chatMessageList.push(chatMessage);
              }
            });
          });
        });

      });
      
    });
    this.chatPageService.getAllUsers().subscribe((users:User[])=>{
      users.forEach((user:User)=>{
        let chatUser:ChatUserModel = new ChatUserModel();
        chatUser.id = user.id;
        chatUser.userName = user.name;
        chatUser.userConnectionStatus = true;
        this.chatUsersList.push(chatUser);
      });
      console.log("ChatUserList");
      console.log(this.chatUsersList);
    }

    );
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
          this.chatMessageList.push(chatMessage);
     });
  });
}
  publishMessage(messageToPublish:string){
    let messageToTravel:MessageTravelModel = new MessageTravelModel();
    messageToTravel.senderName = this.chatUser.name;
    messageToTravel.senderId = this.chatUser.id;
    messageToTravel.bodyMessage = messageToPublish;
    console.log(JSON.stringify(messageToTravel));
    this.rxStomp.publish({ destination: this.mountUrlBrokerToPub(this.URL_BROKER_ROOT_PUB, this.userContactId.toString()), body: JSON.stringify(messageToTravel)});
  }
  mockMessageList(sender:string, receiver:string):void{
    this.chatMessageList = [];
    let numElements:number = 5; 
    for(var i = 0; i < numElements; i++){
      let chatMessage:ChatMessageModel = new ChatMessageModel();
      chatMessage.messageText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
      chatMessage.sendDate = new Date();
      chatMessage.userSender = sender + ' ' + 'para' + ' ' + receiver;
      this.chatMessageList.push(chatMessage);
    }
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
