import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartProductInfo } from '../../interface/cart-product-info';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../checkout/checkout.css']
})
export class CheckoutComponent {
  public cartItems: CartProductInfo[] = [];
  public ProductPrice: number = 0;
  public TotalPrice: number = 0;
  public isLoading: boolean = true;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getUserCart();
  }

  //取得購物車內容
  private getUserCart() {
    const cartAttr = [
      "productId",
      "orderQuantity",
      "name",
      "price",
      "inventories",
      "img",
      "onePrice"
    ];
    this.cartService.getUserCart().subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          //把 cartAttr 設定的給 API response 的屬性名 map 傳給 cartItems
          this.cartItems = resp.data.map((item: any[]) => {
            const cart: any = {};
            cartAttr.forEach((cartAttr, index) => {
              //單一品項的價格是: 價格 * 數量
              if (cartAttr === "onePrice") {
                cart[cartAttr] = item[3] * item[1];
              } else {
                cart[cartAttr] = item[index];
              }
            });
            return cart;
          });
          this.updateTotalPrices();
          console.log('確認成功！');
        }
      },
      error: (err) => {
        console.error('確認失敗~~', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  //計算總商品價跟總價
  private updateTotalPrices(): void {
    this.ProductPrice = this.cartItems.reduce((totalPrice, currentItem) => {
      return totalPrice + currentItem.onePrice;
    }, 0);
    this.TotalPrice = this.ProductPrice + 300;
  }

  //計算 container 的 height
  public calculateContainerHeight(): number {
    const itemHeight = 100; 
    const otherElementsHeight = 500; 
    const itemCount = this.cartItems.length;
    return itemCount * itemHeight + otherElementsHeight;
  }
}
