import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductInfo } from '../interface/cart-product-info';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = "http://presale.money-link.com.tw/sweetApi";
  cartItems: CartProductInfo[] = [];
  private cartItemsSubject = new BehaviorSubject<CartProductInfo[]>([]);
  cartItems$: Observable<CartProductInfo[]> = this.cartItemsSubject.asObservable();

  constructor(private http:HttpClient, private authService:AuthService) {}

  //GetUserCart API
  public getUserCart(): Observable<any> {
    const token = this.authService.getToken(); 
    const body = { "token":token };
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/getUserCart`, body);
  }

  //AddUserCart API
  public addUserCart(productId: number, orderQuantity: number) {
    const token = this.authService.getToken();
    const body = { "token":token, "productId":productId, "orderQuantity":orderQuantity };
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/addUserCart`, body);
  }
  
  //DeleteUserCart API
  public deleteUserCart(productId: number) {
    const token = this.authService.getToken();
    const body = { "token":token, "productId":productId };
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/deleteUserCart`, body);
  }

  //向購物車中添加商品項
  public addToCartItems(productId: number, orderQuantity: number, typeId:number): void {
    this.getProductInfo(productId).subscribe({
      next: (productInfo: any) => {
        const currentCartItems = this.cartItemsSubject.getValue();
        currentCartItems.push({
          productId,
          orderQuantity,
          quantity: productInfo.quantity,
          name: productInfo.name,
          price: productInfo.price,
          inventories: productInfo.inventories,
          img: productInfo.img,
          onePrice: productInfo.price * orderQuantity,
          totalProductPrice: 0, 
          totalPrice: 0 
        });
        this.cartItemsSubject.next(currentCartItems);
      },
      error: (error) => {
        console.error('Failed to get product info:', error);
      }
    });
  }
  
  //GetProductInfo API
  public getProductInfo(productId: number): Observable<any> {
    return this.http.get<any>(`${this.corsUrl}${this.apiUrl}/getProductInfo/${productId}`);
  }

  //BatchUpdateUserCart API
  public batchUpdateUserCart(requestData: { userCarts: { productId: number, orderQuantity: number }[] }): Observable<any> {
    const token = this.authService.getToken();
    const body = {
      token: token,
      ...requestData
    };
    return this.http.post<any>(`${this.apiUrl}/batchUpdateUserCart`, body);
  }
}
