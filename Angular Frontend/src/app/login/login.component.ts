import { Component, ViewChild } from '@angular/core';
import { LoginModel } from 'src/models/login.model';
import { LoginService } from 'src/services/login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  currentSlideIndex = 1;
  login:LoginModel;
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';
  hasLoginError: boolean = false;

  @ViewChild('idInput', { static: false }) idInput!: HTMLInputElement;
  @ViewChild('passwordInput', { static: false }) passwordInput!: HTMLInputElement;

  constructor(private loginService:LoginService){
    this.login = new LoginModel(); 
 }

  onInputFocus(inputField: HTMLInputElement) {
    inputField.classList.add('active');
  }

  onInputBlur(inputField: HTMLInputElement) {
    if (inputField.value === '') {
      inputField.classList.remove('active');
    }
  }

  clearEmailError() {
    this.emailError = '';
  }

  clearPasswordError() {
    this.passwordError = '';
  }

  moveSlider(index: number) {
    this.currentSlideIndex = index;
  }

  ngOnInit() {
    this.startCarouselAutoChange();
  }

  startCarouselAutoChange() {
    setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex % 3) + 1;
    }, 3000); 
  }

  loginCall(){
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';

    if (this.login.email === '') {
      this.emailError = 'Email is required.';
    }
    if (this.login.password === '') {
      this.passwordError = 'Password is required.';
    }
    if (this.login.email !== '' && this.login.password !== ''){
      this.loginService.loginIntern(this.login).subscribe((data)=>{
    
        this.login = data as LoginModel;
        localStorage.setItem("role", this.login.role)
        localStorage.setItem("token",this.login.token);
        if(this.login.token!=null)
        {
          const userData={
            id:this.login.id, 
            email: this.login.email,
            role: this.login.role,
            token: this.login.token
           }
           
            const encryptedData = CryptoJS.AES.encrypt(
              JSON.stringify(userData),
              'your-secret-key'
            ).toString();
            window.location.href = `http://localhost:3000?data=${encodeURIComponent(
              encryptedData
            )}`;
        }  
      },
      err=>{
        console.log(err);
        if (err.status === 400) {
          this.loginError = 'Check your credentials and try again.';
          this.hasLoginError = true;
        }
      });
    }
  }
}

