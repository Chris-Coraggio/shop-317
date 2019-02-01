import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { Product } from '../product';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
@Injectable()
export class ProductModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, db: AngularFirestore, private auth: AuthService) {
    this.db = db;
  }

  ngOnInit() {
    console.log(this.data);
  }

  quantity: String = "1";
  quantityNumberCopy = 1;
  checkoutUrl: String;
  db: AngularFirestore;

  incrementQuantity(){
    this.quantityNumberCopy++;
    this.quantity = this.quantityNumberCopy.toString();
  }

  decrementQuantity(){
    if(this.quantityNumberCopy > 0){
      this.quantityNumberCopy--;
      this.quantity = this.quantityNumberCopy.toString();
    }
  }

  getTempCartID(){
    return "TEMP" + Math.random().toString(36).substring(2,15);
  }

  addToCart(){
    var product = this.data.product;
    var body = {
      quantity: this.quantity,
      cost: parseFloat(product.price) * 100,
      product_name: product.name
    };

    this.auth.user.subscribe(user => {
      //if you haven't logged in, a temporary cart will be provided to you
      var cartPath = user.uid === undefined ? this.getTempCartID() : user.uid;

      //check for other instances of the product already in cart
      this.db.doc(`carts/${cartPath}`).get()
      .subscribe(docSnapshot => {
        var data = docSnapshot.data();
        if(data == null){
          var obj = new Object();
          obj[product.name] = body;
          this.db.doc(`carts/${cartPath}`).set(obj);
        } else {
          body.quantity = String(Number(body.quantity) + Number(data[product.name].quantity));
          var obj = new Object();
          obj[product.name] = body;
          this.db.doc(`carts/${cartPath}`).update(obj)
        }
      });
    })
  }
}
