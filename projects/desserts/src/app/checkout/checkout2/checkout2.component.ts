import { Component } from '@angular/core';
import { CheckoutService } from 'projects/desserts/src/service/checkout.service';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['../../checkout/checkout.css']
})
export class Checkout2Component {
  public receiveCredit: string = '';
  public receiveLastName: string = '';
  public receiveFirstName: string = '';
  public CardValidMonth: string = '';
  public CardValidYear: string = '';
  public CardSafeNumber: string = '';
  public readonly month: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  constructor(private checkoutService:CheckoutService) {}

  ngOnInit() {
    this.CardValidMonth = this.month[0];
  }

  //透過給 service 存放的方式傳遞 checkout2表單資料
  public setInfo2ToService() {
    console.log(this.receiveCredit);
    this.checkoutService.setAddress(this.receiveCredit);
  }
}
