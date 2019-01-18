import { Component, OnInit, Injectable, forwardRef, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { UploadService } from '../core/upload.service';
import { firestore } from 'firebase';
import { Variation } from '../variation';

@Component({
  selector: 'variationsList',
  templateUrl: './variations-list.component.html',
  styleUrls: ['./variations-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VariationsListComponent),
      multi: true
    }
  ]
})
@Injectable()
export class VariationsListComponent implements OnInit {

  constructor(uploadService: UploadService, db: AngularFirestore) {
    this.db = db;
    this.uploadService = uploadService;
  }

  ngOnInit() {
    if(this.currentVariationListId != ""){
      this.variationList = this.db.doc(`variations/${this.currentVariationListId}`).valueChanges();
    }
  }

  uploadService: UploadService;
  uploadProgress: Observable<number>;
  @Input('list-id') currentVariationListId: String = "";
  db: AngularFirestore;
  variationList: Observable<{}>;
  description: String = "";

  upload(event: any){
    console.log(event)
    if(this.currentVariationListId == ""){
      this.currentVariationListId = this.generateID();
      this.propagateChange(this.currentVariationListId);
      this.db.doc(`variations/${this.currentVariationListId}`).set({});
      this.variationList = this.db.doc(`variations/${this.currentVariationListId}`).valueChanges();
    }
    this.uploadService.upload(event, this.currentVariationListId);
    this.uploadProgress = this.uploadService.getUploadProgress();
  }

  saveVariation(variationListId: string){
    var setObj = new Object();
    this.db.doc(`variations/${this.currentVariationListId}`).ref.get()
    .then(data=>{
      console.log(data.data());
      var img = Object.values(data.data())[0];
      setObj[variationListId] = {
        description: this.description,
        ...img
      };
      console.log(setObj);
      this.db.doc(`variations/${this.currentVariationListId}`).set(setObj);
    })
    
  }

  generateID(): string {
    return "VAR" + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

  getCurrentVariationListId(): String {
    return this.currentVariationListId;
  }

  writeValue(obj: any){
    if(obj !== undefined){
      this.currentVariationListId = obj;
    } else {
      this.currentVariationListId = "";
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any){
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any){

  }

}