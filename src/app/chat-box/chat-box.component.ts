import {AfterViewChecked, AfterViewInit, Component, Input, Output, OnChanges, EventEmitter, OnInit, SimpleChange, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import {ChatMessageModel} from '../chat-message/chat-message-model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked{

  @Input() chatMessageList:ChatMessageModel[];
  @Output() sendMessageClickedEvent = new EventEmitter<string>();
  @ViewChild('chatBoxList') chatBoxList:ElementRef;
  chatMessageEdit:string = '';

  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {
    if(!!this.chatBoxList){
       this.chatBoxList.nativeElement.scrollTop = this.chatBoxList.nativeElement.scrollHeight - this.chatBoxList.nativeElement.clientHeight;
    }
  }

  onSend(): void {
    console.log(this.chatMessageEdit);
    this.sendMessageClickedEvent.emit(this.chatMessageEdit);
    this.chatMessageEdit = "";
    //this.rxStomp.publish({ destination: '/app/test', body: this.chatMessageEdit });
  }


}
