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
  }

  ngOnInit() {

  }

  products: Observable<any[]>;
  db: AngularFirestore;
  primaryImage: string;

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

}
