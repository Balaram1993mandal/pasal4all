import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  // products$ : Observable<any>;
  products: Product[]=[];
  filteredProducts:Product[]=[];
   
  category:String='';
  cart: any;
  subscription!: Subscription;

  constructor(
    route: ActivatedRoute,
    productService:ProductService,
    private shoppingCartService: ShoppingCartService ) { 
    // this.products$ = productService.getAll();

 
    productService
    .getAll().switchMap( products=>{
      
      this.products=products;
      return route.queryParamMap;
    })
      
      .subscribe(params =>{
        this.category =  params.get('category') as string; //async op
  
        this.filteredProducts = (this.category) ?
        this.products.filter(p=>p.category=== this.category) :
        this.products;
      });
    
  //async op


//this.categories$ = categoryService.getAll();

  //  this.categories$ = categoryService.getCategories(); //mosh changed the method to getAll
   
  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart()).subscribe( (cart:any)=>this.cart = cart); }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
