import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<any>;
  @Input('category') category!: String;

  constructor(categoryService: CategoryService) {   
    this.categories$ = categoryService.getCategories();
    // this.categories$ = categoryService.getAll();
  }


  ngOnInit(): void {
  }

}
