import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { ProductType } from '../../interface/product-type';
import { TypeList } from '../../interface/type-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../home/index.css']
})
export class HomeComponent {
  public products: TypeList[] = [];
  public productTypes: ProductType[] = [];
  public activeProductId: number | null = null;
  public isLoading: boolean = true;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(){
    this.getAllProductType();
    this.setActiveProduct(1);
  }

  //取得甜點類別列表
  private getAllProductType() {
    this.productService.getAllProductType().subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.products = resp.data.slice(0,3).map((item: any) => ({
            typeId: item[resp.fieldIndex.typeId],
            typeName: item[resp.fieldIndex.chinese],
            data: item[resp.fieldIndex.status]
          }));
        console.log('取得列表成功！');
      } else {
          console.error('取得列表失敗~~', resp.message);
        }
      },
      error: (error) => {
        console.error('取得列表錯誤:(', error);
      },
      complete: () => {
        this.isLoading= false;
      }
    });
  }
  
  //取得商品頁內容
  private getProductsByTypeId(typeId: number) {
    this.productService.getProductsByTypeId(typeId).subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.productTypes = resp.data.map((item: any) => ({
            product_id: item[resp.fieldIndex.productId],
            name: item[resp.fieldIndex.name],
            price: item[resp.fieldIndex.price],
            inventories: item[resp.fieldIndex.inventories],
            img: item[resp.fieldIndex.img],
            type_id: typeId
          }));
          console.log('取得產品成功！');
        } else {
          console.error('取得產品失敗~~', resp.message);
        }
      },
      error: (err) => {
        console.error('取得產品錯誤:(', err);
      }
    });
  }
  
  //取得 typeName
  public getTypeName(typeId: number): string {
    const product = this.products.find(product => Number(product.typeId) === Number(typeId));  
      return product ? product.typeName : '';
  }

  //根據 typeId 來決定呼叫哪個商品頁
  public setActiveProduct(typeId: number) {
    this.activeProductId = typeId;
    this.getProductsByTypeId(typeId);
  }

  //加入購物車
  public addUserCart(productID: number, orderQuantity: number, typeId: number) {
    this.cartService.addUserCart(productID, orderQuantity).subscribe({
        next: (resp) => {
            if (resp.status === 200) {
                console.log('加入成功！');
                this.cartService.addToCartItems(productID, orderQuantity, typeId);
            } else {
                console.error('加入失敗~~', resp.message);
            }
        },
        error: (err) => {
            console.error('加入錯誤:(', err);
        }
    });
  }
}

