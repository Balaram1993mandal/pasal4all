import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  categories$: Observable<any[]>;
  id:any;
  product:Product= {
    key:'',
    category: '',
    imageUrl: '',
    price: 0,
    title: ''
  } ;
 

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {   this.categories$ = categoryService.getCategories();
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe((p: any) => (this.product = p) );
                                            }

  save(product: Product){
    // console.log(product);

    if (this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(!confirm("Are you sure?")) return;
      
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

  ngOnInit(): void {
  }

}
