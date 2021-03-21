import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User, LoginForm} from './login-page-model';
import {LoginService} from './login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm:LoginForm;
  user:User;

  display: boolean;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.display = false;
    this.loginForm = new LoginForm();
    this.user = new User();
  }
  signin(){
    this.display = true;
  }
  login(){
    console.log("login");
    console.log(this.loginForm);
    this.loginService.submitLogin(this.loginForm.email, this.loginForm.password).subscribe((res:any) => {
      console.log("respostaDoSubmitLogin:");
      console.log(res);
      if(res){
        localStorage.setItem('userEmail', this.loginForm.email);
        localStorage.setItem('userPass', this.loginForm.password);
        this.router.navigate(["/chat"]);
      }else{
        alert("Login inválido");
      }
    });
  }
  submitSigninData(){
    this.loginService.submitSigninData(this.user).subscribe((res:any) => {
      console.log(this.user);
      console.log(res);
      this.display = false;
    });
  }
  handleHideSubmit(){
    this.user.id = null;
    this.user.email = null;
    this.user.hobbie = null;
    this.user.name = null;
    this.user.password = null;
  }

}
