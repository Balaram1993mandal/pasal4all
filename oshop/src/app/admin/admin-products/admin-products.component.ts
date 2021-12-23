import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/product';

import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  // products$: Observable<any>;
  products!:Product[];
  filteredProducts!:Product[];

  subsciption!: Subscription;
  nameProducts!: Product[];

  products$:Observable<any>;
//


  constructor(private productService: ProductService) {

   this.products$ = this.productService.getName();
   this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  //  this.productService.getName().subscribe(products => this.products$ = this.products = products);  
   }
filter(query:string){
  console.log(query);
  this.filteredProducts = (query) ? 
  this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())): this.products;
}
  ngOnInit(): void {
  }

  // ngOnDestroy(){this.subsciption.unsubscribe();}

} 
