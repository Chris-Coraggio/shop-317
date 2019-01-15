import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../product';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.css']
})

@Injectable()
export class StorefrontComponent implements OnInit {

  products: Observable<any[]>;
  db: AngularFirestore;
  dialog: MatDialog;

  constructor(db: AngularFirestore, dialog: MatDialog) {
    this.db = db;
    this.dialog = dialog;
  }

  ngOnInit() {
    this.products = this.db.collection("products").valueChanges();
  }

  showDialog(product: Product){
    console.log(product);
    this.dialog.open(ProductModalComponent, {
      data:{
        product
      }
    })
  }

}
