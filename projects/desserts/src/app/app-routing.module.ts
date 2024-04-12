import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout1Component } from './checkout/checkout1/checkout1.component';
import { Checkout2Component } from './checkout/checkout2/checkout2.component';
import { Checkout3Component } from './checkout/checkout3/checkout3.component';
import { Checkout31Component } from './checkout/checkout3/checkout31/checkout31.component';
import { Checkout32Component } from './checkout/checkout3/checkout32/checkout32.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

export const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent, title: 'Sweetaste 首頁'},
  {path: 'Products', component: ProductsComponent, title: 'Sweetaste 甜點產品'},
  {path: 'Login', component: LoginComponent, title: 'Sweetaste 會員登入'},
  {path: 'Cart', component: CartComponent, title: 'Sweetaste 購物車'},
  {path: 'Checkout', component :CheckoutComponent,
    children: [
      {path: '', redirectTo: '/Checkout1', pathMatch: 'full'},
      {path: 'Checkout1', component: Checkout1Component, title:'Sweetaste 結帳列表'},
      {path: 'Checkout2', component: Checkout2Component, title:'Sweetaste 結帳列表'},
      {path: 'Checkout3', component: Checkout3Component,
        children: [
          {path: '', redirectTo: '/Checkout31', pathMatch: 'full'},
          {path: 'Checkout31', component: Checkout31Component, title:'Sweetaste 結帳列表'},
          {path: 'Checkout32', component: Checkout32Component, title:'Sweetaste 結帳列表'}
        ]
      }
    ]
  },
  {path: 'Checkout_Success', component: CheckoutSuccessComponent,title: '結帳成功'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { Routes };
