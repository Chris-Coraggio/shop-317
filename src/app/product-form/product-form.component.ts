import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(db: AngularFirestore) {
    this.categories = db.collection("categories").valueChanges();
    this.db = db;
  }

  ngOnInit() {
  }

  categories: Observable<any[]>;
  product: any = {};
  db: AngularFirestore;

  addOrUpdateProduct() {

    var product = this.product;

    if(!product.id){
      product.id = this.generateID();
    }
  
    const productRef: AngularFirestoreDocument<any> = this.db.doc(`products/${product.id}`);  
    var result = productRef.set(product, { merge: true })
    if(result){
      alert("Added product successfully!");
      return result;
    } else {
      alert("Error adding product :(");
      return result;
    }
  }

  generateID() {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

}
