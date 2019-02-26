import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { Product } from '../product';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
@Injectable()
export class ProductCardComponent implements OnInit {

  products: Observable<any[]>;
  db: AngularFirestore;
  dialog: MatDialog;
  @Input('id') productId: String;
  product: any;
  @Input('onclick') onclick: Function = this.showDialog;

  constructor(db: AngularFirestore, dialog: MatDialog) {
    this.db = db;
    this.dialog = dialog;
  }

  ngOnInit() {
    console.log(this.productId);
    this.db.doc(`products/${this.productId}`).get()
    .subscribe(data => {
      this.product = data.data();
    })
    console.log(this.onclick);
  }

  showDialog(){
    this.dialog.open(ProductModalComponent, {
      data:{
        product: this.product
      }
    })
  }

}
