import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  static getCategories: any;

  constructor(private db: AngularFireDatabase) { }

//   getCategories() {
// return this.db.list('/categories',     ,(ref) => ref.orderByChild('name')    )
//   }
getCategories() {
  return this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
      map((actions) => {
          return actions.map((action) => ({
              key: action.key,
              val: action.payload.val(),
          }));
      }));

}
}
