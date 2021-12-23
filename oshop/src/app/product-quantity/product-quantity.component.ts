import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!:Product;
  @Input('shopping-carts') shoppingCart!:ShoppingCart;
 
 
   constructor(public cartService:ShoppingCartService) { }
   
  
 
   addToCart() { this.cartService.addToCart(this.product); }  
 
   removeFromCart(){ 
     if(this.shoppingCart.getQuantity(this.product)!=0)
     {this.cartService.removeFromCart(this.product);}
      else{}
  }
   
  //  getQuantity(){
  //    if(!this.shoppingCart) {return 0; console.log("Empty Cart");}
  //    else {let item=this.shoppingCart.items[this.product.key];
  //      console.log(item);
  //      console.log("And");
       
  //    return item ? item.quantity : 0;}
  //  }
 
}
