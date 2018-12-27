import { Component, OnInit } from '@angular/core';
import { Product } from '../product'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afs: AngularFirestore) {
    //this.categories = afs.collection("heroes").valueChanges();
  }

  ngOnInit() {
  }

}
