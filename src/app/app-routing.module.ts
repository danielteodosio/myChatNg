import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';
import {AuthGuardService} from './guards/auth-guard.service';
import { from } from 'rxjs';


const routes: Routes = [
  {path:'', component: LoginPageComponent}, 
  {path:'login', component: LoginPageComponent},
  {path:'chat', component: ChatPageComponent, canActivate:[AuthGuardService]},
  {path: 'chat-box-test', component: ChatBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
