import { Component, OnInit, Input, Injectable, forwardRef } from '@angular/core';
import { UploadService } from '../core/upload.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
    }
  ]
})

@Injectable()
export class UploadImageComponent implements OnInit, ControlValueAccessor {

  constructor(uploadService: UploadService, db: AngularFirestore) { 
    this.uploadService = uploadService;
    this.db = db;
  }

  ngOnInit() {
    if(this.currentImageListId != ""){
      this.imageList = this.db.doc(`images/${this.currentImageListId}`).valueChanges();
      this.propagateChange(this.currentImageListId);
    }  
  }

  @Input('id') currentImageListId: String = "";
  uploadService: UploadService;
  db: AngularFirestore;
  imageList: Observable<{}>;
  uploading: boolean;
  uploadProgress: Observable<number>;

  upload(event: any){
    console.log(event)
    if(this.currentImageListId == ""){
      this.currentImageListId = this.generateID();
      this.propagateChange(this.currentImageListId);
      this.db.doc(`images/${this.currentImageListId}`).set({});
      this.imageList = this.db.doc(`images/${this.currentImageListId}`).valueChanges();
    }
    this.uploadService.upload(event, this.currentImageListId);
    this.uploadProgress = this.uploadService.getUploadProgress();
  }

  getURL(obj: Object): Observable<string> {
    return obj["url"];
  }

  getFileName(obj: Object): Observable<string> {
    return obj["fileName"];
  }

  writeValue(obj: any){
    if(obj !== undefined){
      this.currentImageListId = obj;
    } else {
      this.currentImageListId = "";
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any){
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any){

  }

  generateID(): String {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
  }

}
