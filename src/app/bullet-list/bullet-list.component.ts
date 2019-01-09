import { Component, OnInit, Injectable, Input, forwardRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bulletList',
  templateUrl: './bullet-list.component.html',
  styleUrls: ['./bullet-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BulletListComponent),
      multi: true
    }
  ]
})
@Injectable()
export class BulletListComponent implements OnInit, ControlValueAccessor {

  constructor(db: AngularFirestore) {
    this.db = db;
  }

  ngOnInit() {
    if(this.currentBulletListId != ""){
      this.bulletList = this.db.doc(`bullets/${this.currentBulletListId}`).valueChanges();
    }
  }

  bulletString: String;
  bulletList: Observable<{}>;
  @Input('list-id') currentBulletListId: String = "";
  db: AngularFirestore
  updateToggle: boolean = true;

  addBullet(){
    console.log("Adding bullet: " + this.currentBulletListId)
    if(this.currentBulletListId == ""){
      // create a new list
      console.log("New list");
      this.currentBulletListId = this.generateID();
      this.propagateChange(this.currentBulletListId);
      var temp = new Object();
      temp[this.generateID()] = this.bulletString;
      this.db.doc(`bullets/${this.currentBulletListId}`).set(temp);
      this.bulletList = this.db.doc(`bullets/${this.currentBulletListId}`).valueChanges();
    } else {
      var temp = new Object();
      temp[this.generateID()] = this.bulletString;
      this.db.doc(`bullets/${this.currentBulletListId}`).update(temp);
    }
    this.bulletString = "";
  }

  removeBullet(bulletId: string){
    let docRef = this.db.doc(`bullets/${this.currentBulletListId}`);
    var deleteObj = new Object();
    deleteObj[bulletId] = firestore.FieldValue.delete();
    docRef.update(deleteObj);
  }

  generateID(): string {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  getCurrentBulletListId(): String {
    return this.currentBulletListId;
  }

  writeValue(obj: any){
    if(obj !== undefined){
      this.currentBulletListId = obj;
    } else {
      this.currentBulletListId = "";
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any){
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any){

  }

}
