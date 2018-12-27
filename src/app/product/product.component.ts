import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor(db: AngularFirestore) { 
    this.products = db.collection("products").valueChanges();
  }

  ngOnInit() {
  }

  products: Observable<any[]>;

  selectedProduct: Product;

  onSelect(product: Product){
    this.selectedProduct = product;
  }

}
