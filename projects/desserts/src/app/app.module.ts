import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { Checkout1Component } from './checkout/checkout1/checkout1.component';
import { Checkout2Component } from './checkout/checkout2/checkout2.component';
import { Checkout31Component } from './checkout/checkout3/checkout31/checkout31.component';
import { Checkout32Component } from './checkout/checkout3/checkout32/checkout32.component';
import { Checkout3Component } from './checkout/checkout3/checkout3.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    FooterComponent,
    CartComponent,
    Checkout1Component,
    Checkout2Component,
    Checkout31Component,
    Checkout32Component,
    Checkout3Component,
    CheckoutComponent,
    CheckoutSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
