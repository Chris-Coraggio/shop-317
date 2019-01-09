import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../category';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
@Injectable()
export class CategoryViewComponent implements OnInit {

  db: AngularFirestore;
  categories: Observable<any[]>;
  newCategory: String;
  categoryToRemove: string;

  constructor(db: AngularFirestore) { 
    this.db = db;
  }

  ngOnInit() {
    this.categories = this.db.collection("categories").valueChanges();
  }

  addCategory(categoryString: String){
    var category = {
      id: this.generateID(),
      name: categoryString
    }
    this.db.doc(`categories/${category.id}`).set(category);
    this.newCategory = "";
  }

  removeCategory(id: string){
    this.db.doc(`categories/${id}`).delete();
  }

  generateID(): string {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

}
