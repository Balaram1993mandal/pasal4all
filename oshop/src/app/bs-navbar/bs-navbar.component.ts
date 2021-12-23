import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl:'./bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent {
  products!:Product[];
  filteredProducts!:any[];
  cart!: ShoppingCartItem;
  // shoppingCartItemCount!: number;
  cart$!:Observable<ShoppingCart>;

 
 


  constructor(public auth: AuthService,private productService: ProductService, private shoppingCartService: ShoppingCartService) {
    // this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);

     }



  logout() { 
    this.auth.logout();

  }


  async ngOnInit(){
  // this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);

  // this.auth.appUser$.subscribe(appUser=>this;appUser = appUser)
  
  
 this.cart$= await this.shoppingCartService.getCart(); 

}
   

}
