import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login/login.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public accountExistError: boolean = false;
  public newUsername: string = '';
  public newPassword: string = '';
  public isRegister: boolean = false;
  public haveRegister: boolean = false;
  public whetherUserPass: boolean = true;
  public whetherUsername: boolean = true;
  public whetherPassword: boolean = true;
  public whetherNewUserPass: boolean = true;
  public whetherNewUsername: boolean = true;
  public whetherNewPassword: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  //登入時帳號密碼未填寫的警訊
  private loginWarning({ whetherUserPass = true, whetherUsername = true, whetherPassword = true }: { whetherUserPass?: boolean, whetherUsername?: boolean, whetherPassword?: boolean } = {}) {
    this.whetherUserPass = whetherUserPass;
    this.whetherUsername = whetherUsername;
    this.whetherPassword = whetherPassword;
  }

  //註冊時帳號密碼未填寫的警訊
  private registerWarning({ whetherNewUserPass = true, whetherNewUsername = true, whetherNewPassword = true }: { whetherNewUserPass?: boolean, whetherNewUsername?: boolean, whetherNewPassword?: boolean } = {}) {
    this.whetherNewUserPass = whetherNewUserPass;
    this.whetherNewUsername = whetherNewUsername;
    this.whetherNewPassword = whetherNewPassword;
  }

  //登入帳號
  public login() {
    //判定有無輸入
    if(this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: (resp) => {
          console.log('登入成功！', resp);
          alert(`登入成功！歡迎 ${this.username}！`);
          this.username = '';
          this.password = '';
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('登入失敗', err);
          this.accountExistError = true;
          this.loginWarning();
        }
      });
    } else if(!this.username && !this.password) {
      this.loginWarning({ whetherUserPass: false });
      this.accountExistError = false;
    } else {
        if(!this.username) {
          this.loginWarning({ whetherUsername: false });          
          this.accountExistError = false;
        } else {
          this.loginWarning({ whetherPassword: false });
          this.accountExistError = false;
        } 
    }
  }

  //登入帳號跟註冊帳號的畫面切換鈕
  public registerToggle(operation?: 'clean') {
    switch(operation) {
      case 'clean':
        this.isRegister = !this.isRegister;
        this.username = "";
        this.password = "";
        this.registerWarning();
        break;
      default:
        this.isRegister = !this.isRegister;
        this.loginWarning();
        this.accountExistError = false;
        this.newUsername = "";
        this.newPassword = "";
        break;
    }
  }

  //註冊帳號
  public register() {
    //判定有無輸入
    if (this.newUsername && this.newPassword) {
      this.authService.register(this.newUsername, this.newPassword).subscribe({
        next: (resp) => {
          if (resp.status === 200) {
            alert('註冊成功!');
            this.isRegister = !this.isRegister;
            this.username = this.newUsername;
            this.password = this.newPassword;
          } else {              
            console.error('註冊失敗~~', resp.message);
          }
        },
        error: (err) => {
          console.error('註冊錯誤:(', err);
          this.haveRegister = true;
          this.registerWarning();
        }
      });
    } else if(!this.newUsername && !this.newPassword) {
      this.registerWarning({ whetherNewUserPass: false });
      this.haveRegister = false;
    } else {
        if(!this.newUsername) {
          this.registerWarning({ whetherNewUsername: false });
          this.haveRegister = false;
        } else {
          this.registerWarning({ whetherNewPassword: false });
          this.haveRegister = false;
        }
    }
  }
}