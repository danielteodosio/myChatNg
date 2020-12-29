import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ChatUserModel} from '../chat-user/chat-user-model';


@Component({
  selector: 'app-users-box',
  templateUrl: './users-box.component.html',
  styleUrls: ['./users-box.component.css']
})
export class UsersBoxComponent implements OnInit {

  @Input() chatUsersList:ChatUserModel[] = new Array<ChatUserModel>();
  @Output() userListClickedEvent = new EventEmitter<number>();

  constructor() { 
    // let userNames:string[] = ["Morrissey", "Johny", "Andy", "Myke"];
    // for(var i = 0; i < userNames.length; i++){
    //   let user:ChatUserModel = new ChatUserModel();
    //   user.userName = userNames[i];
    //   user.userId = i;
    //   user.userConnectionStatus = true;
    //   this.userList.push(user);
    //   console.log(user);
    // }
    // console.log(this.userList);
  }

  ngOnInit(): void {
  }

  notifyUserClicked(userId:number):void{
    this.userListClickedEvent.emit(userId);
    console.log(userId);
  }

}
