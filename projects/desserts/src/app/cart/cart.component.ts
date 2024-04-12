import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartProductInfo } from '../../interface/cart-product-info';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../cart/cart.css']

})
export class CartComponent {
  public cartItems: CartProductInfo[] = [];
  public totalProductPrice: number = 0;
  public totalPrice: number = 0;
  public isLoading: boolean = true;
  public isCart: boolean = true;
  public isAccount: boolean = true;

  constructor(private cartService: CartService, private router: Router, private productService: ProductService) {}
  
  ngOnInit() {
    this.getUserCart();    
  }

  //取得購物車內容
  private getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (resp) => {
        if(resp.status === 200) {
          this.cartItems = resp.data.map((item: any) => ({
            productId: item[resp.fieldIndex.productId],
            orderQuantity: item[resp.fieldIndex.orderQuantity],
            name: item[resp.fieldIndex.name],
            price: item[resp.fieldIndex.price],
            inventories: item[resp.fieldIndex.inventories],
            img: item[resp.fieldIndex.img],
          }));
          console.log('取得購物車成功！');
          this.updateTotalPrices();
        } else {
          console.error('取得購物車失敗: ', resp.message);
        }
      },
      error: (err) => {
        console.error('取得購物車錯誤: ', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  //計算總商品價跟總價
  private updateTotalPrices(): void {
    let totalProductPrice = 0;
    this.cartItems.forEach(item => {
      totalProductPrice += item.price * item.orderQuantity; // 计算每个商品的总价并加到总商品价格中
      item.onePrice = item.price * item.orderQuantity;
    });
    this.totalProductPrice = totalProductPrice;
    this.totalPrice = this.totalProductPrice + 300; // 假设您还添加了 300 的运费
  }
  

  //更新商品總價
  private updateTotal(item: CartProductInfo) {
    item.onePrice = item.price * item.orderQuantity;
    this.updateTotalPrices();
  }
  
  //更改商品數量按鈕: 加一個、指定個 n 個、減一個
  public updateQuantity(item: CartProductInfo, quantity?: number | string) {
    if(typeof quantity === 'number') {
      item.orderQuantity = quantity;
      item.orderQuantity = Math.max(0, quantity);
      if(item.inventories < item.orderQuantity) {
        alert(`你太超過了喔喔喔喔喔，「${item.name}」的商品庫存數量只有 ${item.inventories}個！`);
        item.orderQuantity = item.inventories;
        return;
      } else if(item.orderQuantity < 1) {
        this.removeItem(item);
      }
      this.updateCartQuantity(item);
      this.updateTotal(item);
    } else {
      if (quantity !== undefined && quantity !== null && quantity !== '' && +quantity > 0) {
        item.orderQuantity = +quantity;
        if(item.inventories < item.orderQuantity) {
          alert(`你太超過了喔喔喔喔喔，「${item.name}」的商品庫存數量只有 ${item.inventories}個！`);
          item.orderQuantity = item.inventories;
          return;
        } else {
          item.orderQuantity = +quantity;
          this.updateCartQuantity(item);
          this.updateTotal(item);
        }
      } else if(quantity === '') {
        item.onePrice = 0;
        this.updateCartQuantity(item);
        this.updateTotal(item);
        return;
      } else {
        this.removeItem(item);
      }
    }
  }
  
  //檢查購物車內單一商品是否有庫存
  public updateCartQuantity(item: CartProductInfo) {
    this.productService.updateUserCart(item.productId, item.orderQuantity).subscribe({
      next: (resp) => {},
      error: (err) => {
        console.log(err);
        // alert('太超過了喔喔喔');
        return;
      }
    });
  }

  //移除購物車內單一商品
  public removeItem(item: CartProductInfo): void {
    const productId = item.productId;
    this.cartService.deleteUserCart(productId).subscribe({
        next: (resp) => {
            if(resp.status === 200) {
                console.log('刪除品項成功！');
                const index = this.cartItems.findIndex(cartItem => cartItem.productId === productId);
                if(index !== -1) {
                    this.cartItems.splice(index, 1);
                    this.updateTotalPrices();
                }
            }
        },
        error: (err) => {
            console.error('刪除品項失敗:(', err);
        }
    });
  }

  //結帳前的確認購物車內商品是否都有庫存
  public batchUpdateUserCart() {
    if(this.cartItems.length === 0) {
      this.isCart = false;
      return;
    } else {
      //存放庫存不足的商品名稱
    let outOfStockItems: string[] = [];
    this.cartItems.forEach(item => {
      //檢查商品庫存
      if (item.inventories <= 0 || item.inventories < item.orderQuantity) {
        outOfStockItems.push(item.name);
      }
    });
    if (outOfStockItems.length > 0) {
      alert(`「${outOfStockItems.join(', ')}」庫存不足！！`);
    } else {
      const requestData = {
        //符合 API 的 request
        "userCarts": this.cartItems.map(item => ({"productId": item.productId, "orderQuantity": item.orderQuantity}))
      };
      this.cartService.batchUpdateUserCart(requestData).subscribe({
        next: (resp) => {
          if(resp.status === 200) {
            console.log('以上都有庫存！');
            this.router.navigate(['/Checkout/Checkout1']);
          } else {}
        },
        error: (err) => {
          console.log(err);
          this.isAccount = false;
        }
      });
    }}
  }
  
  //計算 container 的 height
  public calculateContainerHeight(): number {
    const itemHeight = 100; 
    const otherElementsHeight = 330; 
    const itemCount = this.cartItems.length;
    return itemCount * itemHeight + otherElementsHeight;
  }
}

