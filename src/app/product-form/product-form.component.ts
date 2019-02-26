import { Component, OnInit, Input } from '@angular/core';

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
    console.log(this.product);
  }

  categories: Observable<any[]>;
  @Input('prod') product: any = {};
  @Input('uid') formName: string;
  db: AngularFirestore;
  oldCategory: string;
  new: boolean = false;

  addProduct() {

    var product = this.product;

    if(!product.id){
      product.id = this.generateID();
      this.new = true;
    }

    this.setPrimaryImageAndSubmitProduct(product)
  }

  generateID() {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  newCategory(event: Event){

    this.db.doc(`products/${this.product.id}`).get()
    .subscribe(data =>{
      if(data.data()){
        this.oldCategory = data.data().category;
        if(!this.oldCategory){
          this.oldCategory = "0";
        }
      }
    });
  }

  setPrimaryImageAndSubmitProduct(product: Product){
    console.log(product);
    if(!product.primaryImage){
      if(product.images){
      this.db.doc(`images/${product.images}`).get()
      .subscribe(data => {
        let obj = data.data();
        console.log(obj);
        var url;
        for(let key in obj){
          url = obj[key]["url"];
          break;
        }
        console.log(url);
        if(url != null){
          product.primaryImage = url;
        }
        this.moveOn(product);
      })
      } else {
        this.moveOn(product);
      }
    } else {
      this.moveOn(product);
    }
  }

  moveOn(product: Product){
    const productRef: AngularFirestoreDocument<any> = this.db.doc(`products/${product.id}`); 
      //scrape away any undefined keys
      Object.keys(product).forEach(key => product[key] === undefined ? delete product[key] : '');
      var result = productRef.set(product, { merge: true })
      if(this.oldCategory){
        // remove from old category if category changes
        console.log("Old category: " + this.oldCategory + "     " + this.product.id);
        this.db.doc(`categories/${this.oldCategory}`).update({
            productIds: firestore.FieldValue.arrayRemove(this.product.id)
        });
      }
      if(product.category){
        this.db.doc(`categories/${product.category}`).update({
          productIds: firestore.FieldValue.arrayUnion(product.id)
        });
      } else {
        this.db.doc(`categories/0`).set({
          id: 0,
          name: "Undefined",
          productIds: [product.id]
        });
      }
      if(result){
        alert(this.new ? "Added product successfully!" : "Edited product successfully!");
        return result;
      } else {
        alert(this.new ? "Error adding product :(" : "Error editing product :(");
        return result;
      }
  }
}
