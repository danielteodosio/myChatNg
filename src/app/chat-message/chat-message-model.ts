export class ChatMessageModel {
    userSenderId:number;
    userReceiverId:number;
    userSender:string;
    sendDate:Date;
    messageText:string;
    messageId:number;
}
export class MessageTravelModel{
    senderName:string;
    senderId:number;
    bodyMessage:string;
}

export class MessageIdsToUpdateModel{
  idsToUpdate:number[];
}

