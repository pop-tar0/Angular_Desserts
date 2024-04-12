import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = "http://presale.money-link.com.tw/sweetApi";

  constructor(private http:HttpClient, private cartService:CartService, private authService:AuthService) {}


  //GetAllProductType API
  public getAllProductType():Observable<any>{
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/getAllProductType`, {});
  }

  //GetProductsByTypeId API
  public getProductsByTypeId(typeId:number):Observable<any>{
    const body = { "typeId":typeId };
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/getProductsByTypeId`, body);
  }

  //UpdateUserCart API
  public updateUserCart(productId:number, orderQuantity:number):Observable<any>{
    const token = this.authService.getToken();
    const body = { "token":token, "productId":productId, "orderQuantity":orderQuantity};
    return this.http.post(`${this.corsUrl}${this.apiUrl}/updateUserCart`, body);
  }
}
