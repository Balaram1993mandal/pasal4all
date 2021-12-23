import { Component, Input, OnInit } from '@angular/core';
import { analytics } from 'firebase';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
 @Input('product') product!:Product;
 @Input('show-actions') showActions=true;
//  @Input('shopping-cart') shoppingCart: any;
 @Input('shopping-carts') shoppingCart!:ShoppingCart;


  constructor(private cartService:ShoppingCartService) { }
  
  


  addToCart() { this.cartService.addToCart(this.product); 
 }  

  // removeFromCart(){ this.cartService.removeFromCart(this.product);}
  
  // getQuantity(){
  //   if(!this.shoppingCart) {return 0; console.log("Empty Cart");}
  //   else {let item=this.shoppingCart.items[this.product.key];
  //     console.log(item);
  //     console.log("And");
      
  //   return item ? item.quantity : 0;}
  // }


}
