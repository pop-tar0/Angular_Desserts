import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'projects/desserts/src/service/checkout.service';

@Component({
  selector: 'app-checkout31',
  templateUrl: './checkout31.component.html',
  styleUrls: ['../../../checkout/checkout.css']
})
export class Checkout31Component {
  public billNumber: string = '';
  public uniformNumber: string = '';

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  //結帳送出表單內容
  public onSubmitCart(): void {
    const body = {
      receiverName: this.checkoutService.buyerName,
      receiverPhone: this.checkoutService.buyerPhone,
      receiverAddress: this.checkoutService.buyerAddress,
      receiveCredit: this.checkoutService.buyerCredit,
      billNumber: this.billNumber,
      uniformNumber: this.uniformNumber
    }
    this.checkoutService.checkoutUserCart(body).subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          alert('您的訂單已送出囉！');
          console.log(body);
        } else {
          console.error('訂單送出失敗~~', resp.message);
        }
      },
      error: (err) => {
        console.error('訂單送出錯誤:(', err);
        alert('您的訂單送出錯誤:(');
      }
    });
  }
}
