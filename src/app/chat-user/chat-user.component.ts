import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  @Input() userName:string;
  @Input() userId:number;
  @Input() isUserConnected:boolean;
  @Input() numberOfNewMessages:number;
  @Output() userClickedEvent = new EventEmitter<number>();

  constructor() {

  }

  ngOnInit(): void {

  }

  notifyUserClicked(userId: number):void{
    this.userClickedEvent.emit(userId);
  }

}
