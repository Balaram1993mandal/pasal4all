import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private db: AngularFireDatabase) { }

  create(product:any){
   return this.db.list('/products').push(product);
  }
  
  // getAll(): Observable<any> {
  //   return this.db.list('/products') .snapshotChanges()
  //   .pipe(map( action => action
  //     .map(a => {
  //       const key = a.payload.key;
  //       const data = a.payload.val();
  //       return  data;
  //     }))); ;
  // }
  getAll(): Observable<any> {
    return this.db.list<Product>('/products/').snapshotChanges().pipe( map(changes =>
                changes.map(c => {
                    const data = c.payload.val();
                    const key = c.payload.key;
                    return { key, ...data };
                })
            ));
  
  }



  //

  getName(): Observable<any> {
    return this.db.list<Product>('/products/').snapshotChanges();}


//   getAll(): Observable<Product[]> {
//     return this.db.list<Product>('/products')
//         .snapshotChanges()
//         .pipe(
//             map(changes =>
//                 changes.map(c => {
//                     const data = c.payload.val() as Product;
//                     const id = c.payload.key;
//                     return { id, ...data };
//                 })
//             )
//         );
// }
  
get(productId: String) {
  return this.db.object('/products/' + productId);
}

update(productId:string, product:any){
return this.db.object('/products/'+ productId).update(product);

}

delete(productId:string){
  return this.db.object('/products/'+ productId).remove();

}


//   getAll(): Observable<any> {
//     return this.db.list('/products')
//         .snapshotChanges()
//         .pipe(
//             map(changes =>
//                 changes.map(c => {
//                     const data = c.payload.val();
//                     const id = c.payload.key;
//                     return { id, ...data };
//                 })
//             )
//         );
// }
}
