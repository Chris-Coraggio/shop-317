import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { firestore } from 'firebase';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
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

  addProduct() {

    var product = this.product;

    if(!product.id){
      product.id = this.generateID();
    }

    this.setPrimaryImageAndSubmitProduct(product.images, product)
  }

  generateID() {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  setPrimaryImageAndSubmitProduct(imageListId: String, product: Product){
    console.log("At least I'm trying");
    this.db.doc(`images/${imageListId}`).get()
    .subscribe(data => {
      let obj = data.data();
      console.log(obj);
      var url;
      for(let key in obj){
        url = obj[key]["url"];
        break;
      }
      console.log(url);
      product.primaryImage = url;

      const productRef: AngularFirestoreDocument<any> = this.db.doc(`products/${product.id}`);  
      var result = productRef.set(product, { merge: true })
      this.db.doc(`categories/${product.category}`).update({
        productIds: firestore.FieldValue.arrayUnion(product.id)
      });
      if(result){
        alert("Added product successfully!");
        return result;
      } else {
        alert("Error adding product :(");
        return result;
      }
    });
  }

}
