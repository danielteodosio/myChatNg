import { AfterViewInit, Component, Input, Output, OnChanges, EventEmitter, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import {ChatMessageModel} from '../chat-message/chat-message-model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @Input() chatMessageList:ChatMessageModel[];
  @Output() sendMessageClickedEvent = new EventEmitter<string>();
  chatMessageEdit:string = '';

  constructor(/*private rxStompService: RxStompService*/) {
    // this.chatMessageList = new Array<ChatMessageModel>();
    // this.chatMessageEdit = '';
    // let numElements:number = 5; 
    // for(var i = 0; i < numElements; i++){
    //   let chatMessage:ChatMessageModel = new ChatMessageModel();
    //   chatMessage.messageText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    //   chatMessage.sendDate = "21/11/2020";
    //   chatMessage.userSender = "dummy_user";
    //   this.chatMessageList.push(chatMessage);
    // }
  }

  ngOnInit(): void {

  }
  onSend(): void {
    console.log(this.chatMessageEdit);
    this.sendMessageClickedEvent.emit(this.chatMessageEdit);
    //this.rxStomp.publish({ destination: '/app/test', body: this.chatMessageEdit });
  }


}
