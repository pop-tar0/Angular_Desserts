import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = "http://presale.money-link.com.tw/sweetApi";
  //checkout1
  buyerName:string = '';
  buyerPhone:string = '';
  buyerAddress:string = '';
  //checkout2
  buyerCredit:string = '';

  constructor(private http:HttpClient, private authService:AuthService) { }

  //CheckoutUserCart API
  public checkoutUserCart(body:any): Observable<any> {
    const token = this.authService.getToken();
    const requestBody = {
      token: token,
      ...body // 将提供的 JSON 数据合并到请求体中
    };
    return this.http.post<any>(`${this.apiUrl}/checkoutUserCart`, requestBody);
  }

  //給 component 存到 service
  public setName(name:string) {
    this.buyerName = name;
  }

  //給 component 從 service 取得
  public getName() {
    return this.getName;
  }
  
  //給 component 存到 service
  public setPhone(phone:string) {
    this.buyerPhone = phone;
  }

  //給 component 從 service 取得
  public getPhone() {
    return this.getPhone;
  }

  //給 component 存到 service
  public setAddress(address:string) {
    this.buyerAddress = address;
  }

  //給 component 從 service 取得
  public getAddress() {
    return this.getAddress;
  }

  //給 component 存到 service
  public setCredit(credit:string) {
    this.buyerCredit = credit;
  }
}
