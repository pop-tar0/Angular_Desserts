import { Component } from '@angular/core';
import { ProductType } from '../../interface/product-type';
import { TypeList } from '../../interface/type-list';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../products/products.css']
})
export class ProductsComponent {
  public products: TypeList[] = [];
  public productTypes: ProductType[] = [];
  public activeProductId: number | null = null;
  public typeId: number = 0;
  public isProduct: boolean = true;
  public currentPage: number = 1;
  public itemsPerPage: number = 4;
  public totalPage: number = 0;
  public isLoading: boolean = true;
  public allProducts: ProductType[] = [];
  public displayProducts: ProductType[] =[];
  public isPreBtnDisable: boolean = false;
  public isNextBtnDisable: boolean = true;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(){
    this.getAllProductType();
    //預設畫面一加載在第一頁
    this.setActiveProduct(1);
  }

  //取得甜點類別列表
  private getAllProductType() {
    this.productService.getAllProductType().subscribe({
      next: (resp) => {
        //把 typeAttr 設定的給 API response 的屬性名 map 傳給 products
        if (resp.status === 200) {
            this.products = resp.data.map((item: any) => ({
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
    });
  }
  
  //取得商品頁內容
  private getProductsByTypeId(typeId: number, page?: number) {
    //當前頁面第一個項目的索引
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //當前頁面最後一個項目的索引
    const endIndex = startIndex + this.itemsPerPage - 1;
    this.productService.getProductsByTypeId(typeId).subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.allProducts = resp.data.map((item: any) => ({
            product_id: item[resp.fieldIndex.productId],
            name: item[resp.fieldIndex.name],
            price: item[resp.fieldIndex.price],
            inventories: item[resp.fieldIndex.inventories],
            img: item[resp.fieldIndex.img],
            type_id: typeId
          }));
          this.isProduct = true;
          console.log('取得產品成功！');
          //算出幾個分頁
          this.totalPage = Math.ceil(this.allProducts.length / this.itemsPerPage);
          this.displayProducts = this.paginateProducts();
        } else {
          console.error('取得產品失敗~~', resp.message);
        }
      },
      error: (err) => {
        console.error('取得產品錯誤:(', err);
        alert('這頁沒商品歐！！');
        this.isProduct = false;
        return;
      },
      complete: () => {
        this.isLoading = false;
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
    this.typeId = typeId;
    this.currentPage = 1;
    this.getProductsByTypeId(typeId);
    if (this.currentPage !== 1) {
      this.changePage(1); // 如果目前頁不是第一頁，則將其設置爲第一頁
    }
    this.updateButtonStates()
  }
  
  //切換頁按鈕: 上一頁、第 n 頁、下一頁
  public changePage(currentPage: number) {
    this.currentPage = currentPage;
    this.displayProducts = this.paginateProducts();
    this.updateButtonStates();
}

  private updateButtonStates() {
    if (this.currentPage === 1) {
        this.isNextBtnDisable = true;
        this.isPreBtnDisable = false;
    } else if (this.currentPage === this.totalPage) {
        this.isPreBtnDisable = true;
        this.isNextBtnDisable = false;
    } else {
        this.isPreBtnDisable = true;
        this.isNextBtnDisable = true;
    }
  }

  private paginateProducts(): ProductType[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allProducts.slice(startIndex, endIndex);
  }
  
  //產生一個陣列其中包含從 1 到 this.totalPage
  public getPageNumber() {
    //from 建立新的陣列實例
    //_代表映射函數中的第一個參數(通常代表當前元素),但在這裡沒有使用到
    return Array.from({ "length": this.totalPage }, (_, index) => ++index);
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
