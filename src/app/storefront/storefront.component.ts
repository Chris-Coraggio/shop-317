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
  
  db: AngularFirestore;
  categories: Observable<any[]>;

  constructor(db: AngularFirestore){
    this.db = db;
  }

  ngOnInit(){
    this.categories = this.db.collection("categories").valueChanges();
  }


}
