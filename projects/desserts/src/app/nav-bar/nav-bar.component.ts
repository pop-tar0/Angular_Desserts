import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['../nav-bar/index.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }
  
  ngOnInit(): void {
  }

  //根據是否登入切換 登入/登出
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  //登出帳號
  public logout() {
    this.authService.logout();
    this.router.navigate(['/Home']); 
    console.log('登出成功！');
    alert('您已登出！掰');
  }
}
