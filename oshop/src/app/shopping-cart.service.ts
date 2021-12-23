import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';

import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products$: Observable<any>;
  constructor(private db:AngularFireDatabase, private productService:ProductService) { this.products$ = this.productService.getName();}
  //
  private create(){
    return this.db.list('/shopping-carts').push({dateCreated: new Date().getTime()

    }); 
  }

  // async getCart():Promise<AngularFireObject<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/'+ cartId);
  // }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+ cartId).valueChanges()
    .map((x:any) => new ShoppingCart(x.items))
  }

  //
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId +'/');
}

  //

  private async getOrCreateCartId(): Promise<string>{                        //remove promise if needed
    let cartId : string = localStorage.getItem('cartId')?? '';
   
    if (cartId)  return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key ?? '');
    return (result.key ?? '');   //return result.key 
       
  }

 
  
  async addToCart(product:Product) {
    let cartId = await this.getOrCreateCartId()||''; 
    let item$ = this.getItem(cartId || '', product.key);
   
  
    item$
    .valueChanges()
    .pipe(take(1))
    .subscribe((p: any) => {
      if (p) item$.update({ quantity: p.quantity + 1 });
      else item$.set({ product: product, quantity: 1 });
    }); 
  }

  // async addToCart(product: Product) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object(
  //     "/shopping-carts/" + cartId + "/items/{{product.key}}"// changed product.$key
  //   );

  //  }




  //============================
  async removeFromCart(product:Product)
  {

    let cartId = await this.getOrCreateCartId()||''; 
    let item$ = this.getItem(cartId || '', product.key); 
    // let item$ = this.getItem(cartId || '', product.key)
  
    item$
    .valueChanges()
    .pipe(take(1))
    .subscribe((p: any) => {
      if (p) item$.update({ quantity: p.quantity - 1 });
      else item$.set({ product: product, quantity: 1 });
    });

  }

  // private async updateItemQuantity(product:Product, change: number){ 

  //   let cartId = await this.getOrCreateCartId()||''; 
  //   let item$ = this.getItem(cartId, product.key);

  
  //   item$
  //   .valueChanges()
  //   .pipe(take(1))
  //   .subscribe((p: any) => {
  //     p.update({ product: product, quantity: (p.quantity||0 )+ change });
  //   }); 


  // }
  


} 