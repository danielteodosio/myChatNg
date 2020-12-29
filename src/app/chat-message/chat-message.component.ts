import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  //@Input() width:number;
  @Input() messageText:string;
  @Input() messageDate:string;
  @Input() userSender:string;


  constructor() { }

  ngOnInit(): void {
  }

}
