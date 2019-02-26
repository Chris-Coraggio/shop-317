import { Component, OnInit, Injectable } from '@angular/core';
import { Product } from '../product'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent implements OnInit {

  constructor(db: AngularFirestore) {
    this.products = db.collection("products").valueChanges();
    this.db = db;
    this.categories = this.db.collection("categories").valueChanges();
  }

  ngOnInit() {

  }

  products: Observable<any[]>;
  categories: Observable<any[]>;
  db: AngularFirestore;
  primaryImage: string;
  selectedProduct: any = null;

  getCategoryName(catId: String){
    this.db.doc(`categories/${catId}`).get()
    .subscribe(data => {
      let obj = data.data()
      console.log(data);
      return obj.name
    })
  }

  getURL(obj: Object): Observable<string> {
    console.log(obj);
    return obj["url"];
  }

  onSelect(productId: String){
    this.db.doc(`products/${productId}`).get()
    .subscribe(data =>{
      this.selectedProduct = data.data();
      this.db.doc(`images/${this.selectedProduct.images}`).get()
      .subscribe(data => {
        this.selectedProduct.images = data.data();
      });
      this.db.doc(`bullets/${this.selectedProduct.bullets}`).get()
      .subscribe(data => {
        this.selectedProduct.bullets = data.data();
      })
    });
  }

}
