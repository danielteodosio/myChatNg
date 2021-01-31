import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import {HttpClientModule} from '@angular/common/http';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './chat-box/my-rx-stomp.config';
import { UsersBoxComponent } from './users-box/users-box.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { AuthGuardService } from "./guards/auth-guard.service";
//import {InputTextareaModule} from 'primeng/inputtextarea';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChatPageComponent,
    ChatBoxComponent,
    ChatMessageComponent,
    UsersBoxComponent,
    ChatUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToolbarModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
